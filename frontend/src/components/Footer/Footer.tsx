import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <span className="text-sm font-bold text-primary">
            VLN <span className="text-accent">SPEED</span>
          </span>
          <p className="text-xs text-muted mt-1">Measure Your Connection. Know Your Network.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-secondary">
          <Link to="/" className="hover:text-primary transition-colors">Test</Link>
          <Link to="/history" className="hover:text-primary transition-colors">History</Link>
          <Link to="/servers" className="hover:text-primary transition-colors">Servers</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
        </nav>
        <span className="text-xs text-muted">© {new Date().getFullYear()} VLN</span>
      </div>
    </footer>
  );
}
