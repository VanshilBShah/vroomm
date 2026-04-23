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
  car: "ON 4K8 · CKR 992",
  price: 27.08,
  date: "04-05-25",
  from: "North York",
  to: "Radiate Show",
};

const past = [
  { driver: "Isa Frank", rating: 4.5, car: "ON 7B2 · SPR 011", price: 21.22, date: "12-02-25", from: "Evelyn Wiggins Dr", to: "York University" },
  { driver: "John Gates", rating: 4.2, car: "ON 9C3 · SPR 919", price: 21.22, date: "12-02-25", from: "North York", to: "Hyatt Regency" },
  { driver: "Sara Lin", rating: 5.0, car: "ON 4D1 · SPR 442", price: 18.40, date: "08-02-25", from: "Scotiabank Arena", to: "Liberty Village" },
];

function TripsPage() {
  const [tab, setTab] = useState<"current" | "past">("current");

  return (
    <AppShell>
      <TopBar title="My trips" back={false} />

      {/* Tabs */}
      <div className="mx-5 flex rounded-full border border-border bg-secondary/50 p-1">
        {(["current", "past"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-full py-2.5 text-sm font-semibold capitalize transition-all ${
              tab === t ? "bg-card text-foreground shadow-[var(--shadow-card)]" : "text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "current" ? (
        <div className="mx-5 mt-4">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent" />
              <div className="flex-1">
                <p className="font-semibold">{current.driver}</p>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-foreground text-foreground" />
                  <span className="text-xs">{current.rating}</span>
                </div>
              </div>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-secondary">
                <MessageCircle className="h-4 w-4 text-foreground" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-secondary">
                <Phone className="h-4 w-4 text-foreground" />
              </button>
            </div>

            <div className="my-3 h-px bg-border" />

            <Row label="Car no." value={current.car} />
            <Row label="Price" value={`$${current.price}`} />
            <Row label="Date" value={current.date} />

            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-foreground" />
                <span className="text-sm">{current.from}</span>
              </div>
              <div className="ml-[3px] h-3 w-px bg-border" />
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-foreground" />
                <span className="text-sm">{current.to}</span>
              </div>
            </div>

            <div className="relative mt-4 h-32 overflow-hidden rounded-xl border border-border">
              <MapCanvas variant="route" className="h-full w-full" />
            </div>

            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.99]">
              <Navigation className="h-4 w-4" /> Track live
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-5 mt-4 space-y-3">
          {past.map((p, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-accent to-primary" />
                <div className="flex-1">
                  <p className="font-semibold">{p.driver}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-foreground text-foreground" />
                    <span className="text-xs">{p.rating}</span>
                  </div>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-secondary">
                  <MessageCircle className="h-3.5 w-3.5 text-foreground" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-secondary">
                  <Phone className="h-3.5 w-3.5 text-foreground" />
                </button>
              </div>
              <div className="my-3 h-px bg-border" />
              <Row label="Car no." value={p.car} />
              <Row label="Price" value={`$${p.price}`} />
              <Row label="Date" value={p.date} />
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
