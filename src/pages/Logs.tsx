import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Check, Loader2, Shield, ShieldAlert, ShieldX, Activity, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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

type TimeRange = 5 | 15 | 60 | 240;

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: 5, label: '5m' },
  { value: 15, label: '15m' },
  { value: 60, label: '1h' },
  { value: 240, label: '4h' },
];

// Custom hook for fetching logs
function useCloudRunLogs(timeRange: TimeRange) {
  const [entries, setEntries] = useState<LogEntryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const fetchLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fnError } = await supabase.functions.invoke('fetch-cloudrun-logs', {
        body: { limit: 1000, timeRangeMinutes: timeRange, maxPages: 5 },
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
  }, [timeRange]);

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

// Time Range Selector Component
function TimeRangeSelector({ 
  value, 
  onChange 
}: { 
  value: TimeRange; 
  onChange: (value: TimeRange) => void;
}) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/50 border border-border/50">
      {TIME_RANGES.map((range) => (
        <Button
          key={range.value}
          variant="ghost"
          size="sm"
          onClick={() => onChange(range.value)}
          className={cn(
            "px-3 py-1.5 h-auto text-sm font-medium transition-all",
            value === range.value
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
}

// Stat Card Component
function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  variant = 'default' 
}: { 
  label: string; 
  value: number; 
  icon: React.ElementType;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
}) {
  const variantClasses = {
    default: 'stat-card',
    success: 'stat-card stat-card-success',
    warning: 'stat-card stat-card-warning',
    destructive: 'stat-card stat-card-destructive',
  };

  const iconClasses = {
    default: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    destructive: 'text-destructive',
  };

  const valueClasses = {
    default: 'text-foreground',
    success: 'text-success',
    warning: 'text-warning',
    destructive: 'text-destructive',
  };

  return (
    <div className={cn(variantClasses[variant], "group hover:scale-[1.02] transition-transform duration-200")}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground tracking-wider uppercase mb-1">{label}</p>
          <p className={cn("text-3xl font-bold font-mono", valueClasses[variant])}>{value}</p>
        </div>
        <div className={cn("p-3 rounded-lg bg-secondary/50", iconClasses[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

// Live Indicator Component
function LiveIndicator({ isConnected }: { isConnected: boolean }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50">
      <span 
        className={cn(
          "w-2.5 h-2.5 rounded-full",
          isConnected ? "bg-success live-indicator" : "bg-destructive"
        )}
        style={{ 
          boxShadow: isConnected 
            ? '0 0 12px hsl(var(--success))' 
            : '0 0 12px hsl(var(--destructive))' 
        }} 
      />
      <span className="text-sm font-medium text-foreground">
        {isConnected ? 'Live' : 'Offline'}
      </span>
    </div>
  );
}

// Header Component
function LogHeader({ stats, isConnected, isLoading, onRefresh, timeRange, onTimeRangeChange }: {
  stats: LogStats;
  isConnected: boolean;
  isLoading: boolean;
  onRefresh: () => void;
  timeRange: TimeRange;
  onTimeRangeChange: (value: TimeRange) => void;
}) {
  return (
    <header className="dashboard-header border-b border-border/50">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
            <span className="text-2xl">🧙</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Gandalf Traffic Stream</h1>
            <p className="text-sm text-muted-foreground">Real-time request monitoring</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TimeRangeSelector value={timeRange} onChange={onTimeRangeChange} />
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="border-border/50 hover:bg-secondary/50"
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
            Refresh
          </Button>
          <LiveIndicator isConnected={isConnected} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Total Requests" value={stats.total} icon={Activity} variant="default" />
          <StatCard label="Allowed" value={stats.allowed} icon={Shield} variant="success" />
          <StatCard label="Challenged" value={stats.challenged} icon={ShieldAlert} variant="warning" />
          <StatCard label="Blocked" value={stats.blocked} icon={ShieldX} variant="destructive" />
        </div>
      </div>
    </header>
  );
}

// Log Entry Component
function LogEntry({ entry, index }: { entry: LogEntryData; index: number }) {
  const formattedTime = formatTimestamp(entry.timestamp);
  const isAllowed = entry.decision === 'ALLOW';
  const isChallenged = entry.decision === 'CHALLENGE';
  
  const borderColor = isAllowed 
    ? 'border-l-success' 
    : isChallenged 
    ? 'border-l-warning' 
    : 'border-l-destructive';

  const checkColor = isAllowed 
    ? 'text-success' 
    : isChallenged 
    ? 'text-warning' 
    : 'text-destructive';

  return (
    <div 
      className={cn(
        "log-row py-3 px-4 grid grid-cols-[auto_100px_1fr_100px_100px_100px] gap-4 items-center border-l-4",
        borderColor
      )}
      style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
    >
      <div className="flex items-center justify-center w-8">
        <div className={cn("p-1 rounded-full bg-secondary/50", checkColor)}>
          <Check className="h-4 w-4" />
        </div>
      </div>

      <div className="font-mono text-sm text-primary hover:underline cursor-pointer">
        {entry.traceId || entry.id.substring(0, 8)}
      </div>

      <div className="flex items-center gap-3 min-w-0">
        <span className="font-semibold text-foreground">
          <span className="text-primary font-mono">{entry.method}</span>
          {' '}
          <span className="text-muted-foreground">
            {entry.path ? new URL(entry.path, 'http://localhost').pathname : ''}
          </span>
        </span>
        <Badge
          variant="outline"
          className="text-xs px-2.5 py-0.5 font-medium border-info/50 text-info bg-info/10 shrink-0"
        >
          {entry.classification}
        </Badge>
      </div>

      <div className="text-right">
        <span className="text-muted-foreground text-sm">Risk: </span>
        <span className={cn(
          "font-bold font-mono",
          entry.risk === 0 ? "text-success" :
          entry.risk <= 3 ? "text-warning" :
          "text-destructive"
        )}>
          {entry.risk}
        </span>
      </div>

      <div className="text-center">
        <Badge
          className={cn(
            "text-xs px-3 py-1 font-semibold border-0",
            isAllowed ? "bg-success/20 text-success hover:bg-success/30" :
            isChallenged ? "bg-warning/20 text-warning hover:bg-warning/30" :
            "bg-destructive/20 text-destructive hover:bg-destructive/30"
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
      <div className="flex-1 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md border-destructive/50 bg-destructive/5">
          <ShieldX className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-destructive mb-2">Connection Error</h3>
          <p className="text-sm text-muted-foreground">{error}</p>
        </Card>
      </div>
    );
  }

  if (isLoading && entries.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto" />
            <Radio className="h-6 w-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-muted-foreground mt-4">Connecting to traffic stream...</p>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md border-border/50">
          <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Traffic Yet</h3>
          <p className="text-sm text-muted-foreground">
            Requests will appear here in real-time when your services receive traffic
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto terminal-scroll">
      {/* Table Header */}
      <div className="sticky top-0 z-10 glass-effect border-b border-border/50 py-3 px-4 grid grid-cols-[auto_100px_1fr_100px_100px_100px] gap-4 text-xs text-muted-foreground font-semibold tracking-wider uppercase">
        <div className="w-8" />
        <div>Trace ID</div>
        <div>Request</div>
        <div className="text-right">Risk</div>
        <div className="text-center">Decision</div>
        <div className="text-right">Time</div>
      </div>

      {/* Log Entries */}
      <div className="divide-y divide-border/30">
        {entries.map((entry, index) => (
          <div key={entry.id || index} className="animate-fade-in">
            <LogEntry entry={entry} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Logs Page
const Logs = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>(60);
  const { entries, isLoading, error, isConnected, refresh, stats } = useCloudRunLogs(timeRange);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LogHeader 
        stats={stats} 
        isConnected={isConnected} 
        isLoading={isLoading} 
        onRefresh={refresh}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />
      <LogViewer entries={entries} isLoading={isLoading} error={error} />
    </div>
  );
};

export default Logs;