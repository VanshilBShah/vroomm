import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Bell, Sparkles, Repeat, Shield, Leaf } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { MapCanvas } from "../components/MapCanvas";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

const moods = [
  { id: "chill", label: "Chill", emoji: "🌊" },
  { id: "focus", label: "Focus", emoji: "🎯" },
  { id: "party", label: "Party", emoji: "🔥" },
  { id: "silent", label: "Silent", emoji: "🤫" },
];

const quickActions = [
  { icon: Repeat, label: "Rebook", sub: "Last trip", to: "/booking" as const, search: { instant: true } },
  { icon: Shield, label: "Safety", sub: "Shield ON", to: "/confirm" as const, search: undefined },
  { icon: Leaf, label: "Eco", sub: "12kg saved", to: "/trips" as const, search: undefined },
];

function HomePage() {
  const navigate = useNavigate();
  const [mood, setMood] = useState("chill");

  return (
    <AppShell>
      {/* Top status bar */}
      <div className="flex items-center justify-between px-5 pt-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground leading-none">
            VRoooM
          </h1>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Good evening, Vanshil
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-secondary">
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </button>
          <Link to="/profile" className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden border border-border">
            <div className="h-full w-full bg-gradient-to-br from-primary to-accent" />
          </Link>
        </div>
      </div>

      {/* Where to */}
      <div className="mx-5 mt-5">
        <button
          onClick={() => navigate({ to: "/booking", search: { instant: false } })}
          className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 text-left shadow-[var(--shadow-card)] transition-all hover:border-foreground/20"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
            <Search className="h-[18px] w-[18px] text-foreground" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-medium">Where to?</p>
            <p className="text-xs text-muted-foreground">Search destinations</p>
          </div>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            Now
          </span>
        </button>
      </div>

      {/* Live map preview */}
      <div className="relative mx-5 mt-3 h-72 overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
        <MapCanvas variant="search" className="h-full w-full" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-border bg-card/95 px-2.5 py-1.5 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-[11px] font-medium text-foreground">12 cars nearby</span>
        </div>
        <button
          onClick={() => navigate({ to: "/booking", search: { instant: true } })}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-border bg-card/95 px-3 py-1.5 backdrop-blur transition-all hover:bg-card"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="text-[11px] font-medium">AI Pickup</span>
        </button>
      </div>

      {/* Ride mood */}
      <div className="mt-6 px-5">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-foreground">Ride mood</p>
          <span className="text-[11px] text-muted-foreground">Personalize your trip</span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {moods.map((m) => {
            const active = mood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMood(m.id)}
                className={`flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 transition-all ${
                  active
                    ? "border-foreground bg-foreground/[0.03]"
                    : "border-border bg-card hover:border-foreground/20"
                }`}
              >
                <span className="text-xl">{m.emoji}</span>
                <span className="text-xs font-medium">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mx-5 mt-5 grid grid-cols-3 gap-2">
        {quickActions.map(({ icon: Icon, label, sub, to, search }) => (
          <button
            key={label}
            onClick={() => navigate(search ? { to, search } : { to })}
            className="flex flex-col items-start rounded-2xl border border-border bg-card p-3.5 text-left transition-all hover:border-foreground/20"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
              <Icon className="h-4 w-4 text-foreground" strokeWidth={2} />
            </div>
            <p className="mt-2.5 text-sm font-semibold">{label}</p>
            <p className="text-[11px] text-muted-foreground">{sub}</p>
          </button>
        ))}
      </div>

      {/* Insight */}
      <div className="mx-5 mt-4 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-warn" />
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Pricing insight
          </p>
        </div>
        <p className="mt-1.5 text-[13px] text-foreground">
          Demand is <span className="font-semibold">+18%</span> in your area. Book in next 6 min for standard pricing.
        </p>
      </div>
    </AppShell>
  );
}
