import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";

interface NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const LINKS = [
  { to: "/", label: "Test" },
  { to: "/history", label: "History" },
  { to: "/servers", label: "Servers" },
  { to: "/about", label: "About" },
];

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 border-b transition-all duration-300 ${
        scrolled ? "border-border bg-bg/85 backdrop-blur-xl shadow-card" : "border-transparent bg-bg/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <Wordmark />
        </NavLink>

        <nav className="hidden md:flex items-center gap-1 relative">
          {LINKS.map((link) => {
            const isActive = link.to === "/" ? location.pathname === "/" : location.pathname.startsWith(link.to);
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "text-primary" : "text-secondary hover:text-primary"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-lg bg-elevated ring-hairline"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-secondary hover:text-primary hover:border-accent/40 transition-colors"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border text-secondary"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border px-5 py-3 flex flex-col gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? "text-primary bg-elevated" : "text-secondary"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

function Wordmark() {
  return (
    <span className="flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="var(--vln-accent)" opacity="0.12" />
        <path d="M14 16 L32 44 L50 16" stroke="var(--vln-accent)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="50" r="3.4" fill="var(--vln-accent)" />
      </svg>
      <span className="text-[15px] font-bold tracking-tight text-primary">
        VLN <span className="text-accent">SPEED</span>
      </span>
    </span>
  );
}