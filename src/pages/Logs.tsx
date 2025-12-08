import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Check, Loader2, Shield, ShieldAlert, ShieldX, Activity, Radio, Search, Filter, TrendingUp, BarChart3, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

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
type FilterType = 'all' | 'ALLOW' | 'CHALLENGE' | 'BLOCK';

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: 5, label: '5m' },
  { value: 15, label: '15m' },
  { value: 60, label: '1h' },
  { value: 240, label: '4h' },
];

const CHART_COLORS = {
  allow: 'hsl(142, 76%, 36%)',
  challenge: 'hsl(38, 92%, 50%)',
  block: 'hsl(0, 72%, 51%)',
  total: 'hsl(179, 55%, 51%)',
};

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
        body: { limit: 2000, timeRangeMinutes: timeRange, maxPages: 10, httpOnly: true },
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

// Helper function to prepare chart data
function prepareChartData(entries: LogEntryData[]) {
  const timeGroups: { [key: string]: { allow: number; challenge: number; block: number; timestamp: string } } = {};

  entries.forEach(entry => {
    const time = new Date(entry.timestamp);
    const timeKey = `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;

    if (!timeGroups[timeKey]) {
      timeGroups[timeKey] = { allow: 0, challenge: 0, block: 0, timestamp: timeKey };
    }

    if (entry.decision === 'ALLOW') timeGroups[timeKey].allow++;
    else if (entry.decision === 'CHALLENGE') timeGroups[timeKey].challenge++;
    else if (entry.decision === 'BLOCK') timeGroups[timeKey].block++;
  });

  return Object.values(timeGroups).sort((a, b) => a.timestamp.localeCompare(b.timestamp)).slice(-20);
}

// Helper function to prepare pie chart data
function preparePieData(stats: LogStats) {
  return [
    { name: 'Allowed', value: stats.allowed, color: CHART_COLORS.allow },
    { name: 'Challenged', value: stats.challenged, color: CHART_COLORS.challenge },
    { name: 'Blocked', value: stats.blocked, color: CHART_COLORS.block },
  ].filter(item => item.value > 0);
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

// Analytics Charts Component
function AnalyticsCharts({ entries, stats }: { entries: LogEntryData[]; stats: LogStats }) {
  const chartData = useMemo(() => prepareChartData(entries), [entries]);
  const pieData = useMemo(() => preparePieData(stats), [stats]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pb-6">
      {/* Traffic Trend Chart */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Traffic Trend Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAllow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.allow} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={CHART_COLORS.allow} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorChallenge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.challenge} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={CHART_COLORS.challenge} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBlock" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.block} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={CHART_COLORS.block} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area type="monotone" dataKey="allow" stroke={CHART_COLORS.allow} fillOpacity={1} fill="url(#colorAllow)" />
              <Area type="monotone" dataKey="challenge" stroke={CHART_COLORS.challenge} fillOpacity={1} fill="url(#colorChallenge)" />
              <Area type="monotone" dataKey="block" stroke={CHART_COLORS.block} fillOpacity={1} fill="url(#colorBlock)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Decision Distribution Chart */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Decision Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
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
            <p className="text-sm text-muted-foreground">Real-time request monitoring & analytics</p>
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

// Filter and Search Component
function FilterControls({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
  onExport
}: {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: FilterType;
  onFilterChange: (value: FilterType) => void;
  onExport: () => void;
}) {
  return (
    <div className="px-6 py-4 border-b border-border/30 bg-card/30 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by trace ID, path, or IP..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background/50 border-border/50"
          />
        </div>

        <Select value={filterType} onValueChange={(value) => onFilterChange(value as FilterType)}>
          <SelectTrigger className="w-[180px] bg-background/50 border-border/50">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by decision" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Decisions</SelectItem>
            <SelectItem value="ALLOW">Allowed Only</SelectItem>
            <SelectItem value="CHALLENGE">Challenged Only</SelectItem>
            <SelectItem value="BLOCK">Blocked Only</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="border-border/50 hover:bg-secondary/50"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
}

// Log Viewer Component
function LogViewer({ entries, isLoading, error, searchTerm, filterType }: {
  entries: LogEntryData[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  filterType: FilterType;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter entries based on search term and filter type
  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const matchesSearch = !searchTerm ||
        entry.traceId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.path?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.remoteIp?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.id?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = filterType === 'all' || entry.decision === filterType;

      return matchesSearch && matchesFilter;
    });
  }, [entries, searchTerm, filterType]);

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

  if (filteredEntries.length === 0 && entries.length > 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md border-border/50">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Results Found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </Card>
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
        {filteredEntries.map((entry, index) => (
          <div key={entry.id || index} className="animate-fade-in">
            <LogEntry entry={entry} index={index} />
          </div>
        ))}
      </div>

      {/* Results Count */}
      <div className="sticky bottom-0 glass-effect border-t border-border/50 py-2 px-4 text-center">
        <p className="text-xs text-muted-foreground">
          Showing {filteredEntries.length} of {entries.length} requests
        </p>
      </div>
    </div>
  );
}

// Main Logs Page
const Logs = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>(60);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const { entries, isLoading, error, isConnected, refresh, stats } = useCloudRunLogs(timeRange);

  const handleExport = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gandalf-logs-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

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
      <AnalyticsCharts entries={entries} stats={stats} />
      <FilterControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterType={filterType}
        onFilterChange={setFilterType}
        onExport={handleExport}
      />
      <LogViewer
        entries={entries}
        isLoading={isLoading}
        error={error}
        searchTerm={searchTerm}
        filterType={filterType}
      />
      <Footer />
    </div>
  );
};

export default Logs;