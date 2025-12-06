import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  Clock
} from "lucide-react";
import { useState } from "react";

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Gandalf Gateway",
      subtitle: "Sovereign Bot Identity & Community-Driven Verification",
      content: (
        <div className="flex flex-col items-center gap-8">
          <div className="text-8xl">🧙</div>
          <p className="text-xl text-muted-foreground max-w-2xl text-center">
            A framework for decentralized bot identity verification that protects your services 
            from malicious automation while welcoming legitimate traffic.
          </p>
          <div className="flex gap-8 mt-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center">
                <User className="w-10 h-10 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Human</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-info/20 flex items-center justify-center">
                <Bot className="w-10 h-10 text-info" />
              </div>
              <span className="text-sm text-muted-foreground">Good Bot</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-destructive" />
              </div>
              <span className="text-sm text-muted-foreground">Bad Bot</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "The Problem: Asymmetric Warfare",
      subtitle: "Legacy Trust Mechanisms Are Failing",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-destructive flex items-center gap-2">
              <X className="w-5 h-5" /> User-Agent Strings
            </h3>
            <p className="text-muted-foreground">
              Self-declared with zero cryptographic integrity. Trivially spoofable by malicious actors.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-destructive flex items-center gap-2">
              <X className="w-5 h-5" /> IP Reputation
            </h3>
            <p className="text-muted-foreground">
              In the era of IPv4 exhaustion and CGNAT, IP addresses are increasingly shared. 
              Legitimate bots get blocked due to bad neighbors.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-destructive flex items-center gap-2">
              <X className="w-5 h-5" /> Centralized Gatekeeping
            </h3>
            <p className="text-muted-foreground">
              Small labs cannot register with enterprise security vendors. 
              Treated as "guilty until proven innocent."
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-destructive flex items-center gap-2">
              <X className="w-5 h-5" /> Collateral Damage
            </h3>
            <p className="text-muted-foreground">
              When botnets are detected, entire IP ranges get blocked, 
              taking legitimate research crawlers offline.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Traffic Classification",
      subtitle: "How Gandalf Categorizes Every Request",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-success/10 border border-success/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-bold text-success">Human</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  Browser fingerprint matches
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  Natural mouse movements
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  Realistic timing patterns
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  Valid session behavior
                </li>
              </ul>
              <div className="pt-4 border-t border-success/20">
                <span className="text-success font-semibold">ALLOW</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-info/10 border border-info/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-info/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-info" />
                </div>
                <h3 className="text-xl font-bold text-info">Good Bot</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-info" />
                  RFC 9421 signed requests
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-info" />
                  Verified identity (Ed25519)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-info" />
                  Respects robots.txt/ai.txt
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-info" />
                  Rate-limited behavior
                </li>
              </ul>
              <div className="pt-4 border-t border-info/20">
                <span className="text-info font-semibold">ALLOW</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-xl font-bold text-destructive">Bad Bot</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 text-destructive" />
                  Spoofed User-Agent
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 text-destructive" />
                  No cryptographic identity
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 text-destructive" />
                  Aggressive request patterns
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 text-destructive" />
                  Ignores rate limits
                </li>
              </ul>
              <div className="pt-4 border-t border-destructive/20">
                <span className="text-destructive font-semibold">BLOCK / CHALLENGE</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "The Solution: Cryptographic Identity",
      subtitle: "RFC 9421 HTTP Message Signatures",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-card border border-border space-y-3">
              <Key className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold">Ed25519 Signatures</h3>
              <p className="text-sm text-muted-foreground">
                Every request is signed with a private key. Impossible to forge without the key.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border space-y-3">
              <Fingerprint className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold">Persistent Identity</h3>
              <p className="text-sm text-muted-foreground">
                Reputation accrues to the Key ID, not the IP. Identity travels with the bot.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border space-y-3">
              <Zap className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold">Cheap Verification</h3>
              <p className="text-sm text-muted-foreground">
                Ed25519 verification takes microseconds. No performance penalty.
              </p>
            </div>
          </div>
          
          <div className="p-6 rounded-xl bg-muted/30 border border-border font-mono text-sm">
            <div className="text-muted-foreground mb-2"># HTTP Headers</div>
            <div><span className="text-info">Signature-Input:</span> sig1=("@method" "@path" "@authority");keyid="https://lab.edu/keys/bot-1"</div>
            <div><span className="text-info">Signature:</span> sig1=:K2hE...Base64...==:</div>
            <div><span className="text-info">Signature-Agent:</span> MyLabBot/1.0</div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: "Decentralized Discovery",
      subtitle: "Self-Sovereign Identity Without Gatekeepers",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">.well-known Trust Anchor</h3>
              </div>
              <p className="text-muted-foreground">
                Publish your public key on your own domain. No application forms needed.
              </p>
              <div className="p-4 rounded-lg bg-muted/30 font-mono text-sm">
                <div className="text-muted-foreground">https://lab.edu/.well-known/</div>
                <div className="text-primary">http-message-signatures-directory</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Network className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">DNS TXT Records</h3>
              </div>
              <p className="text-muted-foreground">
                Zero maintenance fallback. Set once at registrar, lasts forever.
              </p>
              <div className="p-4 rounded-lg bg-muted/30 font-mono text-sm">
                <div className="text-muted-foreground">key1._bot-auth.lab.edu TXT</div>
                <div className="text-primary">v=BOT1; k=ed25519; p=...key...</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-success/10 border border-success/30">
            <h4 className="font-semibold text-success mb-2">Community Registries</h4>
            <p className="text-sm text-muted-foreground">
              Submit to open-source registries (GitHub) to aggregate reputation. 
              Convince community maintainers, not corporate gatekeepers.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: "Policy Layer: Good Bot Behavior",
      subtitle: "Cryptographic Privilege Comes with Responsibility",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-card border border-border space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">robots.txt Compliance</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Binary allow/disallow. Always check and obey before crawling.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-card border border-border space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">ai.txt Directives</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Granular permissions: Train, Summarize, Cite. Respect content usage rights.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-muted/30 border border-border">
            <h4 className="font-semibold mb-4">Rate Limiting Standards</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">0.1-0.5</div>
                <div className="text-sm text-muted-foreground">RPS (Unknown)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">1</div>
                <div className="text-sm text-muted-foreground">Concurrency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">&lt;1,000</div>
                <div className="text-sm text-muted-foreground">Daily Requests</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">Honor</div>
                <div className="text-sm text-muted-foreground">Crawl-Delay</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
            <div className="flex items-center gap-2 text-warning">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Exponential Backoff Required</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              429 → Wait Retry-After. 503 → Back off 5-15 minutes. 403 + CAPTCHA → Abandon path.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      title: "Detection Flow",
      subtitle: "How Gandalf Processes Each Request",
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {[
              { step: 1, title: "Request", icon: Globe, color: "text-muted-foreground" },
              { step: 2, title: "Signature Check", icon: Key, color: "text-info" },
              { step: 3, title: "Identity Lookup", icon: Fingerprint, color: "text-primary" },
              { step: 4, title: "Behavior Analysis", icon: Shield, color: "text-warning" },
              { step: 5, title: "Decision", icon: Check, color: "text-success" },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-16 h-16 rounded-full bg-card border-2 border-border flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                {index < 4 && (
                  <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-lg bg-success/10 border border-success/30 text-center">
              <Check className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="font-semibold text-success">ALLOW</div>
              <div className="text-sm text-muted-foreground">Valid signature + Good behavior</div>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/30 text-center">
              <AlertTriangle className="w-8 h-8 text-warning mx-auto mb-2" />
              <div className="font-semibold text-warning">CHALLENGE</div>
              <div className="text-sm text-muted-foreground">Unsigned but not malicious</div>
            </div>
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
              <X className="w-8 h-8 text-destructive mx-auto mb-2" />
              <div className="font-semibold text-destructive">BLOCK</div>
              <div className="text-sm text-muted-foreground">Malicious patterns detected</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 8,
      title: "Verification Methods Compared",
      subtitle: "Why RFC 9421 is the Ideal Standard",
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4">Method</th>
                <th className="text-left p-4">Verification Basis</th>
                <th className="text-left p-4">Spoofability</th>
                <th className="text-left p-4">Barrier to Entry</th>
                <th className="text-left p-4">Small Lab Suitability</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="p-4 font-medium">IP Reputation</td>
                <td className="p-4 text-muted-foreground">History of IP</td>
                <td className="p-4 text-warning">Low (easy to rotate)</td>
                <td className="p-4 text-destructive">High</td>
                <td className="p-4 text-destructive">Low</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-4 font-medium">User-Agent</td>
                <td className="p-4 text-muted-foreground">Self-Declaration</td>
                <td className="p-4 text-destructive">High (trivial)</td>
                <td className="p-4 text-success">None</td>
                <td className="p-4 text-destructive">Low</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-4 font-medium">mTLS</td>
                <td className="p-4 text-muted-foreground">Client Certificate</td>
                <td className="p-4 text-success">None</td>
                <td className="p-4 text-destructive">High (complex)</td>
                <td className="p-4 text-warning">Medium</td>
              </tr>
              <tr className="border-b border-border/50 bg-success/5">
                <td className="p-4 font-semibold text-success">RFC 9421</td>
                <td className="p-4 text-muted-foreground">Crypto Signature</td>
                <td className="p-4 text-success">None</td>
                <td className="p-4 text-success">Low (open source)</td>
                <td className="p-4 text-success font-semibold">High (Ideal)</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Proof of Work</td>
                <td className="p-4 text-muted-foreground">CPU Expenditure</td>
                <td className="p-4 text-success">Low</td>
                <td className="p-4 text-destructive">High (costly)</td>
                <td className="p-4 text-destructive">Low</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: 9,
      title: "The Tiered Internet",
      subtitle: "A New Trust Hierarchy for the Agentic Web",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                    <span className="font-bold text-destructive">1</span>
                  </div>
                  <h3 className="text-lg font-semibold">Tier 1: Anonymous</h3>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-destructive/20 text-destructive">
                  Heavy Restrictions
                </span>
              </div>
              <p className="text-muted-foreground">
                Unsigned traffic. Subject to heavy CAPTCHAs, rate limits, and IP blocks.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-info/10 border border-info/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center">
                    <span className="font-bold text-info">2</span>
                  </div>
                  <h3 className="text-lg font-semibold">Tier 2: Signed & Community Verified</h3>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-info/20 text-info">
                  Research Access
                </span>
              </div>
              <p className="text-muted-foreground">
                Traffic signed via RFC 9421 and listed in community registries. Allowed moderate access, trusted for research.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-success/10 border border-success/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <span className="font-bold text-success">3</span>
                  </div>
                  <h3 className="text-lg font-semibold">Tier 3: Signed & Commercial Verified</h3>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-success/20 text-success">
                  Full Access
                </span>
              </div>
              <p className="text-muted-foreground">
                Traffic signed and linked to a paid commercial contract. Maximum trust and access privileges.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 10,
      title: "Summary: The Gandalf Rule",
      subtitle: "You Shall Not Pass (Unless Verified)",
      content: (
        <div className="space-y-8">
          <div className="text-6xl text-center">🧙</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">1</div>
                <h4 className="font-semibold">Identity</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Ed25519 key pair published at /.well-known/ or via DNS TXT
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">2</div>
                <h4 className="font-semibold">Attestation</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Sign every HTTP request using RFC 9421
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">3</div>
                <h4 className="font-semibold">Discovery</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Register in open-source community registries
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">4</div>
                <h4 className="font-semibold">Policy</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Host ai.txt, obey robots.txt directives
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">5</div>
                <h4 className="font-semibold">Behavior</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Rate limit to &lt;1 RPS, implement exponential backoff
              </p>
            </div>

            <div className="p-4 rounded-xl bg-success/10 border border-success/30">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="w-5 h-5 text-success" />
                <h4 className="font-semibold text-success">Result</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                A Sovereign Digital Agent with portable reputation
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/logs">
                View Live Logs <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-border flex items-center justify-between">
        <Button asChild variant="ghost" size="sm" className="gap-2">
          <Link to="/">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{currentSlide + 1} / {slides.length}</span>
        </div>
      </header>

      {/* Slide Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {slides[currentSlide].title}
            </h1>
            {slides[currentSlide].subtitle && (
              <p className="text-xl text-muted-foreground">
                {slides[currentSlide].subtitle}
              </p>
            )}
          </div>
          
          <div className="min-h-[400px]">
            {slides[currentSlide].content}
          </div>
        </div>
      </main>

      {/* Navigation */}
      <footer className="p-4 border-t border-border">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {/* Slide Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide
                    ? "bg-primary"
                    : "bg-muted hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default PitchDeck;
