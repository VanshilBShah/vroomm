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
      <div className="flex items-center gap-1 rounded-full border border-border bg-card px-1.5 py-1.5 shadow-[var(--shadow-elegant)]">
        {items.map(({ to, icon: Icon, label }) => {
          const active = pathname === to || (to === "/home" && pathname === "/");
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              className={`relative flex h-11 items-center justify-center gap-2 rounded-full px-4 transition-all duration-200 ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 2} />
              {active && <span className="text-sm font-medium">{label}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
