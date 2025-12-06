import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/pitch/AnimatedSection";
import { 
  ArrowLeft, 
  ArrowRight, 
  Shield, 
  Bot, 
  User, 
  AlertTriangle, 
  Check, 
  X, 
  Key,
  Globe,
  FileText,
  Zap,
  Lock,
  Fingerprint,
  Network,
  Clock,
  Eye,
  Activity
} from "lucide-react";

const PitchDeck = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-background/60 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧙</span>
            <span className="font-bold text-lg hidden sm:block">Gandalf</span>
          </div>
          <Button asChild size="sm" className="gap-2">
            <Link to="/logs">
              <Activity className="w-4 h-4" />
              Live Logs
            </Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="pt-20">
        
        {/* Hero Section */}
        <AnimatedSection className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-info/5" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-info/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <div className="text-[120px] mb-6 animate-[pulse_3s_ease-in-out_infinite]">🧙</div>
            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4 tracking-tight">
              Gandalf Gateway
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-6">
              Sovereign Bot Identity & Verification
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Protect your services from malicious automation while welcoming legitimate traffic 
              through cryptographic identity verification.
            </p>
            
            {/* Three pillars */}
            <div className="flex flex-wrap gap-6 justify-center">
              {[
                { icon: User, label: "Human", color: "success", desc: "Verified users" },
                { icon: Bot, label: "Good Bot", color: "info", desc: "Authenticated agents" },
                { icon: AlertTriangle, label: "Bad Bot", color: "destructive", desc: "Blocked threats" },
              ].map((item, i) => (
                <div 
                  key={item.label}
                  className="group relative"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`
                    w-32 h-32 rounded-2xl bg-${item.color}/10 border border-${item.color}/30
                    flex flex-col items-center justify-center gap-2
                    transition-all duration-300 group-hover:scale-105 group-hover:bg-${item.color}/20
                  `}>
                    <item.icon className={`w-10 h-10 text-${item.color}`} />
                    <span className={`font-bold text-${item.color}`}>{item.label}</span>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-[pulse_1.5s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Problem Section */}
        <AnimatedSection className="py-24 px-6 bg-gradient-to-b from-background to-destructive/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
                The Problem
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Legacy Trust Is <span className="text-destructive">Broken</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Traditional security mechanisms fail in the modern web
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "User-Agent Strings",
                  desc: "Self-declared with zero integrity. Any bot can claim to be Googlebot.",
                  icon: Eye,
                },
                {
                  title: "IP Reputation",
                  desc: "Shared IPs mean good bots get blocked due to bad neighbors.",
                  icon: Network,
                },
                {
                  title: "Centralized Gatekeeping",
                  desc: "Small labs can't register with enterprise vendors. Guilty until proven innocent.",
                  icon: Lock,
                },
                {
                  title: "Collateral Damage",
                  desc: "When botnets are blocked, legitimate crawlers go down with them.",
                  icon: AlertTriangle,
                },
              ].map((item, i) => (
                <div 
                  key={item.title}
                  className="group p-6 rounded-2xl bg-card/50 backdrop-blur border border-border hover:border-destructive/50 transition-all duration-300"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                        <X className="w-4 h-4 text-destructive" />
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Classification Section */}
        <AnimatedSection className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Traffic Classification
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Three Types of Traffic
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Gandalf categorizes every incoming request into one of three categories
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Human */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-success/5 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 rounded-3xl bg-card border-2 border-success/30 hover:border-success transition-colors">
                  <div className="w-16 h-16 rounded-2xl bg-success/20 flex items-center justify-center mb-6">
                    <User className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-2xl font-bold text-success mb-4">Human</h3>
                  <ul className="space-y-3 mb-6">
                    {["Browser fingerprint matches", "Natural mouse movements", "Realistic timing patterns", "Valid session behavior"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-success shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-success/20">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success font-bold text-sm">
                      <Check className="w-4 h-4" /> ALLOW
                    </span>
                  </div>
                </div>
              </div>

              {/* Good Bot */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-info/20 to-info/5 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 rounded-3xl bg-card border-2 border-info/30 hover:border-info transition-colors">
                  <div className="w-16 h-16 rounded-2xl bg-info/20 flex items-center justify-center mb-6">
                    <Bot className="w-8 h-8 text-info" />
                  </div>
                  <h3 className="text-2xl font-bold text-info mb-4">Good Bot</h3>
                  <ul className="space-y-3 mb-6">
                    {["RFC 9421 signed requests", "Verified Ed25519 identity", "Respects robots.txt/ai.txt", "Rate-limited behavior"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-info shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-info/20">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-info/10 text-info font-bold text-sm">
                      <Check className="w-4 h-4" /> ALLOW
                    </span>
                  </div>
                </div>
              </div>

              {/* Bad Bot */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 to-destructive/5 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 rounded-3xl bg-card border-2 border-destructive/30 hover:border-destructive transition-colors">
                  <div className="w-16 h-16 rounded-2xl bg-destructive/20 flex items-center justify-center mb-6">
                    <AlertTriangle className="w-8 h-8 text-destructive" />
                  </div>
                  <h3 className="text-2xl font-bold text-destructive mb-4">Bad Bot</h3>
                  <ul className="space-y-3 mb-6">
                    {["Spoofed User-Agent", "No cryptographic identity", "Aggressive request patterns", "Ignores rate limits"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <X className="w-4 h-4 text-destructive shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-destructive/20">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive font-bold text-sm">
                      <X className="w-4 h-4" /> BLOCK
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Solution Section */}
        <AnimatedSection className="py-24 px-6 bg-gradient-to-b from-background via-primary/5 to-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
                The Solution
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Cryptographic Identity
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                RFC 9421 HTTP Message Signatures provide unforgeable proof of identity
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { 
                  icon: Key, 
                  title: "Ed25519 Signatures", 
                  desc: "Every request signed with a private key. Impossible to forge.",
                  stat: "256-bit",
                  statLabel: "Security"
                },
                { 
                  icon: Fingerprint, 
                  title: "Persistent Identity", 
                  desc: "Reputation follows the Key ID, not the IP address.",
                  stat: "∞",
                  statLabel: "Portability"
                },
                { 
                  icon: Zap, 
                  title: "Instant Verification", 
                  desc: "Ed25519 verification in microseconds. Zero latency penalty.",
                  stat: "<1ms",
                  statLabel: "Speed"
                },
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-2xl bg-card/50 backdrop-blur border border-border hover:border-primary/50 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{item.stat}</div>
                      <div className="text-xs text-muted-foreground">{item.statLabel}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            
            {/* Code block */}
            <div className="relative p-6 rounded-2xl bg-card border border-border overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <div className="w-3 h-3 rounded-full bg-warning/50" />
                  <div className="w-3 h-3 rounded-full bg-success/50" />
                  <span className="ml-4 text-xs text-muted-foreground font-mono">HTTP Headers</span>
                </div>
                <div className="font-mono text-sm space-y-2">
                  <div className="flex flex-wrap gap-1">
                    <span className="text-info font-bold">Signature-Input:</span>
                    <span className="text-muted-foreground">sig1=("@method" "@path" "@authority");</span>
                  </div>
                  <div className="pl-4 text-muted-foreground">keyid="https://lab.edu/keys/bot-1"</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-info font-bold">Signature:</span>
                    <span className="text-success">sig1=:K2hE...cryptographic_signature...==:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-info font-bold">Signature-Agent:</span>
                    <span className="text-warning">MyLabBot/1.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Discovery Section */}
        <AnimatedSection className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-info/10 text-info text-sm font-medium mb-4">
                Decentralized Discovery
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                No Gatekeepers Required
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Publish your identity on your own domain. Self-sovereign verification.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-card to-primary/5 border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Globe className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">.well-known Anchor</h3>
                    <p className="text-sm text-muted-foreground">Standard web discovery</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-background/50 font-mono text-sm mb-4">
                  <span className="text-muted-foreground">https://</span>
                  <span className="text-primary">your-domain.com</span>
                  <span className="text-muted-foreground">/.well-known/</span>
                  <br />
                  <span className="text-info">http-message-signatures-directory</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Host your public key on your domain. No application forms. Your website becomes your identity provider.
                </p>
              </div>
              
              <div className="p-8 rounded-3xl bg-gradient-to-br from-card to-info/5 border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-info/10 flex items-center justify-center">
                    <Network className="w-7 h-7 text-info" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">DNS TXT Records</h3>
                    <p className="text-sm text-muted-foreground">Zero-maintenance fallback</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-background/50 font-mono text-sm mb-4">
                  <span className="text-muted-foreground">key1._bot-auth.</span>
                  <span className="text-info">your-domain.com</span>
                  <span className="text-muted-foreground"> TXT</span>
                  <br />
                  <span className="text-success">"v=BOT1; k=ed25519; p=..."</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Set once at your registrar, lasts forever. No servers to maintain. DNS is the most reliable distributed database.
                </p>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-success/5 border border-success/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h4 className="font-bold text-success mb-1">Community Registries</h4>
                  <p className="text-sm text-muted-foreground">
                    Submit to open-source GitHub registries to aggregate reputation. Convince community maintainers, not corporate gatekeepers. Your reputation follows you across the entire web.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Flow Section */}
        <AnimatedSection className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Detection Flow
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every request passes through our verification pipeline
              </p>
            </div>
            
            {/* Flow visualization */}
            <div className="relative">
              {/* Connection line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-muted-foreground/20 via-primary/50 to-success/50 -translate-y-1/2 z-0" />
              
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
                {[
                  { step: 1, title: "Request", icon: Globe, color: "muted-foreground", bg: "muted" },
                  { step: 2, title: "Signature", icon: Key, color: "info", bg: "info" },
                  { step: 3, title: "Identity", icon: Fingerprint, color: "primary", bg: "primary" },
                  { step: 4, title: "Behavior", icon: Activity, color: "warning", bg: "warning" },
                  { step: 5, title: "Decision", icon: Shield, color: "success", bg: "success" },
                ].map((item) => (
                  <div key={item.step} className="flex flex-col items-center text-center">
                    <div className={`
                      w-20 h-20 rounded-2xl bg-card border-2 border-${item.bg}/30
                      flex items-center justify-center mb-4
                      hover:scale-110 hover:border-${item.bg} transition-all duration-300
                      shadow-lg shadow-${item.bg}/10
                    `}>
                      <item.icon className={`w-10 h-10 text-${item.color}`} />
                    </div>
                    <div className={`text-xs font-bold text-${item.color} mb-1`}>STEP {item.step}</div>
                    <div className="font-semibold text-foreground">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
              {[
                { icon: Check, label: "ALLOW", desc: "Valid signature + Good behavior", color: "success" },
                { icon: AlertTriangle, label: "CHALLENGE", desc: "Unsigned but potentially legitimate", color: "warning" },
                { icon: X, label: "BLOCK", desc: "Malicious patterns detected", color: "destructive" },
              ].map((item) => (
                <div 
                  key={item.label}
                  className={`p-6 rounded-2xl bg-${item.color}/5 border border-${item.color}/30 text-center hover:bg-${item.color}/10 transition-colors`}
                >
                  <item.icon className={`w-10 h-10 text-${item.color} mx-auto mb-3`} />
                  <div className={`text-xl font-bold text-${item.color} mb-1`}>{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Rate Limits Section */}
        <AnimatedSection className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
                Policy Layer
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Good Bot Behavior
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Identity comes with responsibility. Good bots follow these standards.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { value: "0.5", unit: "RPS", label: "Max request rate" },
                { value: "1", unit: "thread", label: "Concurrency limit" },
                { value: "<1K", unit: "daily", label: "Request volume" },
                { value: "Honor", unit: "delays", label: "Crawl-Delay" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/50 transition-colors">
                  <div className="text-3xl md:text-4xl font-black text-primary">{stat.value}</div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">{stat.unit}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                  <h3 className="font-bold">robots.txt</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Binary allow/disallow directives. Always check and strictly obey before crawling any path.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                  <h3 className="font-bold">ai.txt</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Granular AI permissions: Train, Summarize, Cite. Respect content usage rights and data retention policies.
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-xl bg-warning/5 border border-warning/30 flex items-start gap-4">
              <Clock className="w-6 h-6 text-warning shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-warning mb-1">Exponential Backoff Required</div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground">429</span> → Wait Retry-After · 
                  <span className="text-foreground"> 503</span> → Back off 5-15 min · 
                  <span className="text-foreground"> 403+CAPTCHA</span> → Abandon path
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Comparison Table */}
        <AnimatedSection className="py-24 px-6 bg-gradient-to-b from-background to-muted/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Comparison
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Why RFC 9421?
              </h2>
            </div>
            
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-bold">Method</th>
                    <th className="text-left p-4">Spoofable?</th>
                    <th className="text-left p-4">Barrier</th>
                    <th className="text-left p-4">Small Lab?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { method: "IP Reputation", spoof: "Easy", barrier: "High", lab: "Poor", highlight: false },
                    { method: "User-Agent", spoof: "Trivial", barrier: "None", lab: "Poor", highlight: false },
                    { method: "mTLS", spoof: "None", barrier: "Complex", lab: "Medium", highlight: false },
                    { method: "RFC 9421", spoof: "None", barrier: "Low", lab: "Ideal", highlight: true },
                    { method: "Proof of Work", spoof: "Hard", barrier: "Costly", lab: "Poor", highlight: false },
                  ].map((row) => (
                    <tr 
                      key={row.method} 
                      className={row.highlight ? "bg-success/5" : "hover:bg-muted/30 transition-colors"}
                    >
                      <td className={`p-4 font-bold ${row.highlight ? "text-success" : ""}`}>{row.method}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.spoof === "None" ? "bg-success/10 text-success" :
                          row.spoof === "Hard" ? "bg-warning/10 text-warning" :
                          "bg-destructive/10 text-destructive"
                        }`}>
                          {row.spoof}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.barrier === "Low" || row.barrier === "None" ? "bg-success/10 text-success" :
                          row.barrier === "Complex" || row.barrier === "Costly" ? "bg-destructive/10 text-destructive" :
                          "bg-warning/10 text-warning"
                        }`}>
                          {row.barrier}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.lab === "Ideal" ? "bg-success/10 text-success" :
                          row.lab === "Medium" ? "bg-warning/10 text-warning" :
                          "bg-destructive/10 text-destructive"
                        }`}>
                          {row.lab}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        {/* Summary Section */}
        <AnimatedSection className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-8xl mb-8">🧙</div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              The Gandalf Rule
            </h2>
            <p className="text-xl text-primary font-medium mb-12">
              "You Shall Not Pass" — Unless Verified
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {[
                { num: 1, title: "Identity", desc: "Publish Ed25519 key" },
                { num: 2, title: "Attest", desc: "Sign every request" },
                { num: 3, title: "Discover", desc: "Join community registries" },
                { num: 4, title: "Policy", desc: "Obey robots.txt & ai.txt" },
                { num: 5, title: "Behave", desc: "Rate limit yourself" },
              ].map((item) => (
                <div key={item.num} className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mx-auto mb-3">
                    {item.num}
                  </div>
                  <div className="font-bold text-foreground mb-1">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
              ))}
              <div className="p-4 rounded-xl bg-success/10 border border-success/30">
                <Lock className="w-10 h-10 text-success mx-auto mb-3" />
                <div className="font-bold text-success mb-1">Result</div>
                <div className="text-sm text-muted-foreground">Sovereign Digital Agent</div>
              </div>
            </div>
            
            <Button asChild size="lg" className="gap-2 text-lg px-8 py-6">
              <Link to="/logs">
                <Activity className="w-5 h-5" />
                View Live Traffic Logs
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧙</span>
              <span>Gandalf Gateway</span>
            </div>
            <p>Sovereign Bot Identity Framework</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PitchDeck;
