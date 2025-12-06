import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LogEntryData } from "@/components/logs/LogEntry";

interface UseCloudRunLogsReturn {
  entries: LogEntryData[];
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
  refresh: () => Promise<void>;
  stats: {
    total: number;
    info: number;
    warning: number;
    error: number;
  };
}

export function useCloudRunLogs(): UseCloudRunLogsReturn {
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

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchLogs, 30000);

    return () => clearInterval(interval);
  }, [fetchLogs]);

  const stats = {
    total: entries.length,
    info: entries.filter(e => ['INFO', 'NOTICE', 'DEFAULT'].includes(e.severity?.toUpperCase() || 'DEFAULT')).length,
    warning: entries.filter(e => e.severity?.toUpperCase() === 'WARNING').length,
    error: entries.filter(e => ['ERROR', 'CRITICAL', 'ALERT', 'EMERGENCY'].includes(e.severity?.toUpperCase() || '')).length,
  };

  return {
    entries,
    isLoading,
    error,
    isConnected,
    refresh: fetchLogs,
    stats,
  };
}