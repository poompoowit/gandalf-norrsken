import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Shield, Presentation, TrendingUp, Lock, Zap, CheckCircle2, BarChart3, Filter, Search } from "lucide-react";
import gandalfLogo from "@/assets/gandalf.png";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

        <div className="text-center max-w-5xl relative z-10">
          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <img
                src={gandalfLogo}
                alt="Gandalf"
                className="w-20 h-20 relative z-10 drop-shadow-2xl"
              />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Gandalf, The Gatekeeper
              </h1>
              <Badge variant="outline" className="mt-2 border-primary/50 text-primary">
                AI-Powered Bot Detection & Traffic Protection
              </Badge>
            </div>
          </div>

          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Advanced behavioral analysis and swarm detection to protect your applications from malicious automation while allowing legitimate traffic to flow freely.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
              <Link to="/logs">
                <Activity className="h-5 w-5" />
                Open Dashboard
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 border-border/50 hover:bg-secondary/50">
              <Link to="/pitch">
                <Presentation className="h-5 w-5" />
                View Pitch Deck
              </Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-success/10 border border-success/20 group-hover:bg-success/20 transition-colors">
                    <Activity className="h-5 w-5 text-success" />
                  </div>
                  <CardTitle className="text-lg">Real-time Monitoring</CardTitle>
                </div>
                <CardDescription>
                  Live traffic stream with automatic 30-second refresh and instant updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Real-time request tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Live connection status</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Advanced Analytics</CardTitle>
                </div>
                <CardDescription>
                  Beautiful charts and insights for traffic patterns and security decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Traffic trend visualization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Decision distribution charts</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-warning/10 border border-warning/20 group-hover:bg-warning/20 transition-colors">
                    <Filter className="h-5 w-5 text-warning" />
                  </div>
                  <CardTitle className="text-lg">Smart Filtering</CardTitle>
                </div>
                <CardDescription>
                  Powerful search and filter tools to find exactly what you need
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                    <span>Search by trace ID, path, IP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                    <span>Filter by decision type</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-destructive/10 border border-destructive/20 group-hover:bg-destructive/20 transition-colors">
                    <Shield className="h-5 w-5 text-destructive" />
                  </div>
                  <CardTitle className="text-lg">Security Intelligence</CardTitle>
                </div>
                <CardDescription>
                  Behavioral analysis and swarm detection to stop malicious automation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                    <span>Risk scoring (0-100)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                    <span>Swarm detection alerts</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors">
                    <Lock className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Trust Verification</CardTitle>
                </div>
                <CardDescription>
                  RFC 9421 message signatures to verify legitimate automation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>Trust token validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>Good bot allowlisting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20 group-hover:bg-secondary/20 transition-colors">
                    <Zap className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">Adaptive Control</CardTitle>
                </div>
                <CardDescription>
                  Dynamic traffic management with allow, throttle, challenge, and block
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                    <span>Adaptive rate limiting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                    <span>Challenge-response system</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
