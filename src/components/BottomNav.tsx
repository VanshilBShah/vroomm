import { Link, useLocation } from "@tanstack/react-router";
import { Home, ListChecks, User } from "lucide-react";

const items = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/trips", icon: ListChecks, label: "Trips" },
  { to: "/profile", icon: User, label: "Profile" },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
      <div className="glass-strong flex items-center gap-1 rounded-full px-2 py-2 shadow-elegant">
        {items.map(({ to, icon: Icon, label }) => {
          const active = pathname === to || (to === "/home" && pathname === "/");
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              className={`relative flex h-12 w-14 items-center justify-center rounded-full transition-all duration-300 ${
                active
                  ? "bg-[var(--gradient-primary)] text-neon-foreground glow-neon"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={active ? { background: "var(--gradient-primary)" } : undefined}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 1.8} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
