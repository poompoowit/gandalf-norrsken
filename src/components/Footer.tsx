import { Youtube, Linkedin } from "lucide-react";
import gandalfLogo from "@/assets/gandalf.png";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50 bg-background">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-4 text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <img src={gandalfLogo} alt="Gandalf" className="w-8 h-8" />
          <span className="font-semibold text-foreground">Gandalf, The Gatekeeper</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <a 
            href="https://www.linkedin.com/in/jadypamella/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-info transition-colors"
            title="Jady Pamella"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/phuwit-vititayanon-4b6503157/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-info transition-colors"
            title="Phuwit Vititayanon"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/supun-chathuranga-190372148/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-info transition-colors"
            title="Supun Chathuranga"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
        <a 
          href="https://youtu.be/Fcqh9bwEr_Q"
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-destructive hover:text-destructive/80 transition-colors"
        >
          <Youtube className="w-5 h-5" />
          <span className="text-sm">Watch Demo</span>
        </a>
        <p>© 2025 SU Heroes | Built for Tzafon AI Safety Fixathon (Challenge 1)</p>
      </div>
    </footer>
  );
};

export default Footer;
