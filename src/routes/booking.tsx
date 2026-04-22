import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, ArrowUpDown, Plus, CreditCard, Sparkles, Users, Leaf } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { MapCanvas } from "../components/MapCanvas";
import { TopBar } from "../components/TopBar";

export const Route = createFileRoute("/booking")({
  component: BookingPage,
});

const rides = [
  { id: "ease", name: "Ease", tag: "Nearby", price: 20.58, eta: "2 min", co2: "1.2", seats: 4, emoji: "🚗", grad: "from-primary/30 to-primary/0" },
  { id: "premium", name: "Premium", tag: "0.3 km", price: 27.08, eta: "5 min", co2: "1.4", seats: 4, emoji: "🚙", grad: "from-violet/40 to-violet/0", featured: true },
  { id: "luxury", name: "Luxury", tag: "2 km", price: 40.11, eta: "12 min", co2: "1.8", seats: 4, emoji: "🏎️", grad: "from-warn/30 to-warn/0" },
  { id: "bike", name: "Bike", tag: "0.1 km", price: 14.11, eta: "2 min", co2: "0.3", seats: 1, emoji: "🛵", grad: "from-success/30 to-success/0" },
  { id: "auto", name: "Auto-Rickshaw", tag: "Nearby", price: 16.71, eta: "2 min", co2: "0.6", seats: 3, emoji: "🛺", grad: "from-warn/30 to-warn/0" },
];

function BookingPage() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("North York");
  const [drop, setDrop] = useState("Radiate Show");
  const [selected, setSelected] = useState("premium");
  const [split, setSplit] = useState(false);

  const ride = rides.find((r) => r.id === selected)!;

  return (
    <AppShell>
      <TopBar title="Book a Ride" />

      {/* Map preview */}
      <div className="relative mx-5 h-44 overflow-hidden rounded-3xl glass">
        <MapCanvas variant="route" className="h-full w-full" />
        <div className="absolute bottom-2 left-2 glass rounded-full px-3 py-1 font-mono text-[10px]">
          ETA · {ride.eta} · {ride.co2}kg CO₂
        </div>
      </div>

      {/* Address inputs */}
      <div className="mx-5 mt-4 glass-strong rounded-2xl p-2">
        <div className="flex items-center gap-3 px-3 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-primary glow-neon" />
          <input
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
          />
          <button className="text-muted-foreground hover:text-primary">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="my-1 ml-[18px] h-px bg-border" />
        <div className="flex items-center gap-3 px-3 py-3">
          <MapPin className="h-3.5 w-3.5 text-violet" />
          <input
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
          />
          <button className="text-muted-foreground hover:text-primary">
            <ArrowUpDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* AI suggestion banner — UNIQUE */}
      <div className="mx-5 mt-3 glass rounded-2xl p-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "var(--gradient-primary)" }}>
          <Sparkles className="h-4 w-4 text-neon-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium">AI Smart Pickup</p>
          <p className="font-mono text-[10px] text-muted-foreground">
            Walk 40m to Hyatt corner — save $2.80 & 3 min
          </p>
        </div>
        <button className="font-mono text-[10px] uppercase text-primary">Use →</button>
      </div>

      {/* Ride options */}
      <div className="mx-5 mt-4 space-y-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          Choose your ride
        </p>
        {rides.map((r) => {
          const active = selected === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setSelected(r.id)}
              className={`relative flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                active
                  ? "border-primary glass-strong glow-neon"
                  : "border-border/50 glass hover:border-primary/40"
              }`}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${r.grad} text-2xl`}>
                {r.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{r.name}</p>
                  {r.featured && (
                    <span className="rounded-full bg-violet/20 px-1.5 py-0.5 font-mono text-[9px] uppercase text-violet">
                      Popular
                    </span>
                  )}
                </div>
                <p className="font-mono text-[11px] text-muted-foreground">
                  {r.tag} · {r.eta} · 🌱 {r.co2}kg
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-base font-medium">${r.price}</p>
                <p className="font-mono text-[10px] text-muted-foreground">{r.seats} seats</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Split fare */}
      <div className="mx-5 mt-4 glass rounded-2xl p-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet/20">
          <Users className="h-4 w-4 text-violet" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium">Split fare with friends</p>
          <p className="font-mono text-[10px] text-muted-foreground">
            {split ? `Each pays $${(ride.price / 2).toFixed(2)} · share via QR` : "Tap to enable"}
          </p>
        </div>
        <button
          onClick={() => setSplit(!split)}
          className={`relative h-6 w-11 rounded-full transition-all ${
            split ? "bg-primary" : "bg-input"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition-all ${
              split ? "left-[22px]" : "left-0.5"
            }`}
          />
        </button>
      </div>

      {/* Payment + book */}
      <div className="mx-5 mt-4">
        <div className="glass-strong rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              <span className="text-xs">Apple Pay</span>
              <span className="rounded-full bg-input px-2 py-0.5 font-mono text-[9px]">•••• 4242</span>
            </div>
            <button className="font-mono text-[10px] uppercase text-primary">Change</button>
          </div>
        </div>

        <button
          onClick={() => navigate({ to: "/confirm" })}
          className="mt-3 w-full rounded-2xl py-4 text-center font-medium text-neon-foreground transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-neon)" }}
        >
          Book Now · ${ride.price}
        </button>
      </div>
    </AppShell>
  );
}
