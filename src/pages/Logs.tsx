import { LogHeader } from "@/components/logs/LogHeader";
import { LogViewer } from "@/components/logs/LogViewer";
import { useCloudRunLogs } from "@/hooks/useCloudRunLogs";

const Logs = () => {
  const { entries, isLoading, error, isConnected, refresh, stats } = useCloudRunLogs();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LogHeader
        stats={stats}
        isConnected={isConnected}
        isLoading={isLoading}
        onRefresh={refresh}
      />
      <LogViewer
        entries={entries}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default Logs;