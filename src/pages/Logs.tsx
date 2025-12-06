import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Types
interface LogEntryData {
  id: string;
  timestamp: string;
  severity: string;
  serviceName: string;
  method: string;
  path: string;
  status: string | number;
  latency: string;
  message: string;
  traceId: string;
  remoteIp: string;
  classification: string;
  risk: number;
  decision: string;
}

interface LogStats {
  total: number;
  allowed: number;
  challenged: number;
  blocked: number;
}

// Custom hook for fetching logs
function useCloudRunLogs() {
  const [entries, setEntries] = useState<LogEntryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const fetchLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fnError } = await supabase.functions.invoke('fetch-cloudrun-logs', {
        body: { limit: 100 },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setEntries(data?.entries || []);
      setIsConnected(true);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch logs');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 30000);
    return () => clearInterval(interval);
  }, [fetchLogs]);

  const stats: LogStats = {
    total: entries.length,
    allowed: entries.filter(e => e.decision === 'ALLOW').length,
    challenged: entries.filter(e => e.decision === 'CHALLENGE').length,
    blocked: entries.filter(e => e.decision === 'BLOCK').length,
  };

  return { entries, isLoading, error, isConnected, refresh: fetchLogs, stats };
}

// Header Component
function LogHeader({ stats, isConnected, isLoading, onRefresh }: {
  stats: LogStats;
  isConnected: boolean;
  isLoading: boolean;
  onRefresh: () => void;
}) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🧙</span>
        <h1 className="text-xl font-semibold text-primary">Gandalf Traffic Stream</h1>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground font-mono">{stats.total}</div>
            <div className="text-xs text-muted-foreground tracking-wider">TOTAL</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground font-mono">{stats.allowed}</div>
            <div className="text-xs text-muted-foreground tracking-wider">ALLOWED</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning font-mono">{stats.challenged}</div>
            <div className="text-xs text-muted-foreground tracking-wider">CHALLENGED</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive font-mono">{stats.blocked}</div>
            <div className="text-xs text-muted-foreground tracking-wider">BLOCKED</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} 
                  style={{ boxShadow: isConnected ? '0 0 8px rgb(34 197 94)' : '0 0 8px rgb(239 68 68)' }} />
            <span className="text-sm text-muted-foreground">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

// Log Entry Component
function LogEntry({ entry }: { entry: LogEntryData }) {
  const formattedTime = formatTimestamp(entry.timestamp);
  const isAllowed = entry.decision === 'ALLOW';
  const isChallenged = entry.decision === 'CHALLENGE';
  
  return (
    <div className={cn(
      "py-3 px-4 grid grid-cols-[auto_100px_1fr_100px_100px_100px] gap-4 items-center border-l-4 transition-all duration-200 hover:bg-secondary/50",
      isAllowed ? "border-l-success" : isChallenged ? "border-l-warning" : "border-l-destructive"
    )}>
      <div className="flex items-center justify-center w-8">
        <Check className={cn("h-5 w-5", isAllowed ? "text-success" : isChallenged ? "text-warning" : "text-destructive")} />
      </div>

      <div className="font-mono text-sm text-primary">
        {entry.traceId || entry.id.substring(0, 8)}
      </div>

      <div className="flex items-center gap-4 min-w-0">
        <span className="font-semibold text-foreground">
          {entry.method} {entry.path ? new URL(entry.path, 'http://localhost').pathname : ''}
        </span>
        <Badge
          variant="outline"
          className="text-xs px-3 py-1 font-medium border-primary/50 text-primary bg-primary/10"
        >
          {entry.classification}
        </Badge>
      </div>

      <div className="text-right">
        <span className="text-muted-foreground">Risk: </span>
        <span className="font-semibold text-foreground">{entry.risk}</span>
      </div>

      <div className="text-center">
        <Badge
          className={cn(
            "text-xs px-4 py-1 font-semibold",
            isAllowed ? "bg-success text-success-foreground hover:bg-success/90" :
            isChallenged ? "bg-warning text-warning-foreground hover:bg-warning/90" :
            "bg-destructive text-destructive-foreground hover:bg-destructive/90"
          )}
        >
          {entry.decision}
        </Badge>
      </div>

      <div className="text-right font-mono text-sm text-muted-foreground">
        {formattedTime}
      </div>
    </div>
  );
}


function formatTimestamp(timestamp: string): string {
  if (!timestamp) return '—';
  try {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  } catch {
    return timestamp;
  }
}

// Log Viewer Component
function LogViewer({ entries, isLoading, error }: {
  entries: LogEntryData[];
  isLoading: boolean;
  error: string | null;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && entries.length > 0) {
      scrollRef.current.scrollTop = 0;
    }
  }, [entries]);

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <div className="text-destructive text-lg font-medium mb-2">Error Loading Logs</div>
          <div className="text-muted-foreground text-sm max-w-md">{error}</div>
        </div>
      </div>
    );
  }

  if (isLoading && entries.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <div className="text-muted-foreground">Loading logs from Cloud Run...</div>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <div className="text-2xl mb-2">📋</div>
          <div className="text-muted-foreground">No logs found</div>
          <div className="text-sm text-muted-foreground/60 mt-1">
            Logs will appear here when your Cloud Run services receive traffic
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto bg-background" style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsl(var(--border)) transparent' }}>
      <div className="sticky top-0 z-10 bg-card border-b border-border py-2 px-4 grid grid-cols-[auto_100px_1fr_100px_100px_100px] gap-4 text-xs text-muted-foreground font-medium tracking-wider">
        <div className="w-8" />
        <div>TRACE</div>
        <div>REQUEST</div>
        <div className="text-right">RISK</div>
        <div className="text-center">DECISION</div>
        <div className="text-right">TIME</div>
      </div>

      <div className="divide-y divide-border/50">
        {entries.map((entry, index) => (
          <div key={entry.id || index} className="animate-fade-in" style={{ animationDelay: `${Math.min(index * 20, 200)}ms` }}>
            <LogEntry entry={entry} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Logs Page
const Logs = () => {
  const { entries, isLoading, error, isConnected, refresh, stats } = useCloudRunLogs();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LogHeader stats={stats} isConnected={isConnected} isLoading={isLoading} onRefresh={refresh} />
      <LogViewer entries={entries} isLoading={isLoading} error={error} />
    </div>
  );
};

export default Logs;