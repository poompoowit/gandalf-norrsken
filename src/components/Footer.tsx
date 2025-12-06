import { Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-6 border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <a 
          href="https://youtu.be/Fcqh9bwEr_Q" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <Youtube className="w-5 h-5" />
          <span>Watch Demo</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
