import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ServiceAccountCredentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

// Create JWT for Google Cloud authentication
async function createJWT(credentials: ServiceAccountCredentials): Promise<string> {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: credentials.client_email,
    sub: credentials.client_email,
    aud: credentials.token_uri,
    iat: now,
    exp: now + 3600, // 1 hour expiry
    scope: "https://www.googleapis.com/auth/logging.read",
  };

  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  const signatureInput = `${headerB64}.${payloadB64}`;
  
  // Parse the private key
  const privateKeyPem = credentials.private_key;
  const pemContents = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\n/g, '');
  
  const binaryKey = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
  
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );
  
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    encoder.encode(signatureInput)
  );
  
  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  
  return `${signatureInput}.${signatureB64}`;
}

// Exchange JWT for access token
async function getAccessToken(credentials: ServiceAccountCredentials): Promise<string> {
  const jwt = await createJWT(credentials);
  
  const response = await fetch(credentials.token_uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Token exchange failed:', errorText);
    throw new Error(`Failed to get access token: ${response.status}`);
  }
  
  const data = await response.json();
  return data.access_token;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const credentialsJson = Deno.env.get('GCP_SERVICE_ACCOUNT_JSON');
    if (!credentialsJson) {
      console.error('GCP_SERVICE_ACCOUNT_JSON not found in environment');
      throw new Error('Google Cloud credentials not configured');
    }

    console.log('Credentials length:', credentialsJson.length);
    console.log('Credentials starts with:', credentialsJson.substring(0, 20));
    
    // Try to parse credentials, with better error handling
    let credentials: ServiceAccountCredentials;
    try {
      credentials = JSON.parse(credentialsJson);
    } catch (parseError) {
      console.error('Failed to parse credentials JSON:', parseError);
      console.error('First 100 chars:', credentialsJson.substring(0, 100));
      throw new Error('Invalid credentials format - please re-enter the GCP service account JSON');
    }
    
    console.log('Using project:', credentials.project_id);
    
    // Get request parameters
    const { serviceName, limit = 100, timeRangeMinutes = 60 } = await req.json();
    
    // Calculate time filter
    const now = new Date();
    const startTime = new Date(now.getTime() - timeRangeMinutes * 60 * 1000);
    const timeFilter = `timestamp >= "${startTime.toISOString()}"`;
    
    console.log('Time range:', timeRangeMinutes, 'minutes, from:', startTime.toISOString());
    
    // Get access token
    const accessToken = await getAccessToken(credentials);
    console.log('Successfully obtained access token');
    
    // Build the filter for Cloud Run logs with time range
    const filter = `resource.type="cloud_run_revision" AND (resource.labels.service_name="gandalf-gateway" OR resource.labels.service_name="gandalf-mockapp") AND ${timeFilter}`;
    
    console.log('Fetching logs with filter:', filter);
    
    // Fetch logs from Google Cloud Logging API
    const logsResponse = await fetch(
      `https://logging.googleapis.com/v2/entries:list`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resourceNames: [`projects/${credentials.project_id}`],
          filter: filter,
          orderBy: 'timestamp desc',
          pageSize: limit,
        }),
      }
    );

    if (!logsResponse.ok) {
      const errorText = await logsResponse.text();
      console.error('Logs API error:', errorText);
      throw new Error(`Failed to fetch logs: ${logsResponse.status}`);
    }

    const logsData = await logsResponse.json();
    console.log('Fetched', logsData.entries?.length || 0, 'log entries');
    
    // Transform and filter for HTTP request logs only
    const allEntries = (logsData.entries || []).map((entry: any, index: number) => {
      const httpRequest = entry.httpRequest || {};
      const jsonPayload = entry.jsonPayload || {};
      const textPayload = entry.textPayload || '';
      
      // Extract Gandalf-specific fields from jsonPayload or labels
      const classification = jsonPayload.classification || jsonPayload.type || entry.labels?.classification || 'HUMAN';
      const risk = jsonPayload.risk || jsonPayload.risk_score || entry.labels?.risk || 0;
      const decision = jsonPayload.decision || jsonPayload.action || entry.labels?.decision || 
        (httpRequest.status && httpRequest.status < 400 ? 'ALLOW' : 'BLOCK');
      
      return {
        id: entry.insertId || `log-${index}`,
        timestamp: entry.timestamp,
        severity: entry.severity || 'DEFAULT',
        serviceName: entry.resource?.labels?.service_name || 'unknown',
        method: httpRequest.requestMethod || jsonPayload.method || '',
        path: httpRequest.requestUrl || jsonPayload.path || '',
        status: httpRequest.status || jsonPayload.status || '',
        latency: httpRequest.latency || '',
        userAgent: httpRequest.userAgent || '',
        remoteIp: httpRequest.remoteIp || '',
        message: textPayload || jsonPayload.message || entry.protoPayload?.status?.message || '',
        traceId: entry.trace?.split('/').pop()?.substring(0, 8) || '',
        classification,
        risk,
        decision,
        isHttpRequest: !!(httpRequest.requestMethod || jsonPayload.method),
      };
    });
    
    // Filter to only include HTTP request logs
    const entries = allEntries.filter((entry: any) => entry.isHttpRequest);

    return new Response(JSON.stringify({ entries, nextPageToken: logsData.nextPageToken }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-cloudrun-logs:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});