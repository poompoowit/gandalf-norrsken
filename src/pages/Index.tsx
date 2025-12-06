import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Shield, Presentation } from "lucide-react";
import gandalfLogo from "@/assets/gandalf.png";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
      <div className="text-center max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <img src={gandalfLogo} alt="Gandalf" className="w-16 h-16" />
          <h1 className="text-4xl font-bold text-primary">Gandalf Dashboard</h1>
        </div>
        
        <p className="text-lg text-muted-foreground mb-8">
          Monitor your Cloud Run traffic and security events in real-time
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/logs">
              <Activity className="h-5 w-5" />
              View Traffic Logs
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link to="/pitch">
              <Presentation className="h-5 w-5" />
              View Pitch Deck
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Real-time Monitoring</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Watch incoming requests to your Cloud Run services with automatic refresh
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Security Insights</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Track errors, warnings, and anomalies across gandalf-gateway and gandalf-mockapp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
