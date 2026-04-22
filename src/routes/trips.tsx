import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star, MessageCircle, Phone, MapPin, Navigation } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { TopBar } from "../components/TopBar";
import { MapCanvas } from "../components/MapCanvas";

export const Route = createFileRoute("/trips")({
  component: TripsPage,
});

const current = {
  driver: "Krimy Shah",
  rating: 3.5,
  car: "GJ01 KS 999",
  price: 27.08,
  date: "04-05-25",
  from: "Cygnet One",
  to: "Girish Cold Drinks",
};

const past = [
  { driver: "Isa Frank", rating: 4.5, car: "GJ01 SP 0110", price: 21.22, date: "12-02-25", from: "Evelyn Wiggins Dr", to: "York University" },
  { driver: "John Gates", rating: 4.2, car: "GJ01 SP 9119", price: 21.22, date: "12-02-25", from: "Cygnet One", to: "Hyatt R" },
  { driver: "Sara Lin", rating: 5.0, car: "GJ01 SP 4421", price: 18.40, date: "08-02-25", from: "SP Stadium", to: "Navrangpura" },
];

function TripsPage() {
  const [tab, setTab] = useState<"current" | "past">("current");

  return (
    <AppShell>
      <TopBar title="My Trips" back={false} />

      {/* Tabs */}
      <div className="mx-5 glass-strong flex rounded-full p-1.5">
        {(["current", "past"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-full py-2.5 text-sm font-medium capitalize transition-all ${
              tab === t ? "text-neon-foreground" : "text-muted-foreground"
            }`}
            style={tab === t ? { background: "var(--gradient-primary)", boxShadow: "var(--shadow-neon)" } : undefined}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "current" ? (
        <div className="mx-5 mt-4">
          <div className="glass-strong rounded-3xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-violet" />
              <div className="flex-1">
                <p className="font-medium">{current.driver}</p>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-warn text-warn" />
                  <span className="font-mono text-xs">{current.rating}</span>
                </div>
              </div>
              <button className="glass flex h-9 w-9 items-center justify-center rounded-full">
                <MessageCircle className="h-4 w-4 text-violet" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive">
                <Phone className="h-4 w-4 text-destructive-foreground" />
              </button>
            </div>

            <div className="my-3 h-px bg-border" />

            <Row label="Car no." value={current.car} mono />
            <Row label="Price" value={`$${current.price}`} mono />
            <Row label="Date" value={current.date} mono />

            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm">{current.from}</span>
              </div>
              <div className="ml-[3px] h-3 w-px bg-border" />
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-violet" />
                <span className="text-sm">{current.to}</span>
              </div>
            </div>

            <div className="relative mt-4 h-32 overflow-hidden rounded-2xl">
              <MapCanvas variant="route" className="h-full w-full" />
            </div>

            <button
              className="mt-4 w-full rounded-2xl py-3.5 font-medium text-neon-foreground transition-all hover:scale-[1.02]"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-neon)" }}
            >
              <span className="inline-flex items-center gap-2">
                <Navigation className="h-4 w-4" /> Track Live
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-5 mt-4 space-y-3">
          {past.map((p, i) => (
            <div key={i} className="glass rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-violet to-primary" />
                <div className="flex-1">
                  <p className="font-medium">{p.driver}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-warn text-warn" />
                    <span className="font-mono text-xs">{p.rating}</span>
                  </div>
                </div>
                <button className="glass flex h-8 w-8 items-center justify-center rounded-full">
                  <MessageCircle className="h-3.5 w-3.5 text-violet" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/80">
                  <Phone className="h-3.5 w-3.5 text-destructive-foreground" />
                </button>
              </div>
              <div className="my-3 h-px bg-border" />
              <Row label="Car no." value={p.car} mono />
              <Row label="Price" value={`$${p.price}`} mono />
              <Row label="Date" value={p.date} mono />
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}
