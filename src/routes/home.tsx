import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, Navigation, Bell, Sparkles, Zap, Repeat, Shield, Leaf } from "lucide-react";
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
  { icon: Repeat, label: "Rebook", sub: "Last trip" },
  { icon: Shield, label: "Safety", sub: "Shield ON" },
  { icon: Leaf, label: "Eco", sub: "12kg saved" },
];

function HomePage() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [mood, setMood] = useState("chill");

  return (
    <AppShell>
      {/* Top status bar */}
      <div className="flex items-center justify-between px-5 pt-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Good evening
          </p>
          <h1 className="text-xl font-medium">Vanshil ✦</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="glass flex h-10 w-10 items-center justify-center rounded-full">
            <Bell className="h-4 w-4" />
          </button>
          <Link to="/profile" className="glass flex h-10 w-10 items-center justify-center rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-br from-primary to-violet" />
          </Link>
        </div>
      </div>

      {/* Where to — moved above the map */}
      <div className="mx-5 mt-4 space-y-2">
        <button
          onClick={() => navigate({ to: "/booking" })}
          className="glass-strong flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left transition-all hover:border-primary/40"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
            <Search className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Where are you going?</p>
            <p className="font-mono text-[11px] text-muted-foreground">Tap to search · saved · recents</p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-primary">Go →</span>
        </button>
      </div>

      {/* Live map preview with pulse */}
      <div className="relative mx-5 mt-4 h-72 overflow-hidden rounded-3xl glass">
        <MapCanvas variant="search" className="h-full w-full" />
        <div className="absolute left-3 top-3 glass flex items-center gap-1.5 rounded-full px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-wider">Live · 12 nearby</span>
        </div>
        <div className="absolute bottom-3 right-3 glass flex items-center gap-1.5 rounded-full px-3 py-1.5">
          <Sparkles className="h-3 w-3 text-primary" />
          <span className="font-mono text-[10px] uppercase tracking-wider">AI Pickup ready</span>
        </div>
        <button className="absolute bottom-3 left-3 glass-strong flex h-10 w-10 items-center justify-center rounded-full">
          <Navigation className="h-4 w-4 text-primary" />
        </button>
      </div>

      {/* Mood selector — UNIQUE */}
      <div className="mx-5 mt-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Ride Mood
          </p>
          <span className="font-mono text-[10px] text-primary">syncs music & lights</span>
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {moods.map((m) => {
            const active = mood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMood(m.id)}
                className={`glass flex min-w-[88px] flex-col items-center gap-1 rounded-2xl px-3 py-3 transition-all ${
                  active ? "border-primary glow-neon" : "hover:border-primary/40"
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-xs font-medium">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mx-5 mt-5 grid grid-cols-3 gap-2">
        {quickActions.map(({ icon: Icon, label, sub }) => (
          <button
            key={label}
            className="glass flex flex-col items-start rounded-2xl p-3 text-left transition-all hover:border-primary/40"
          >
            <Icon className="h-4 w-4 text-primary" />
            <p className="mt-2 text-sm font-medium">{label}</p>
            <p className="font-mono text-[10px] text-muted-foreground">{sub}</p>
          </button>
        ))}
      </div>

      {/* Surge / insight */}
      <div
        className="mx-5 mt-5 rounded-2xl p-4 relative overflow-hidden"
        style={{ background: "var(--gradient-glow)" }}
      >
        <div className="glass-strong rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-warn" />
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-warn">
              Pulse Insight
            </p>
          </div>
          <p className="mt-2 text-sm">
            Demand is <span className="text-warn font-medium">+18%</span> in your area. Book in next 6 min for standard pricing.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
