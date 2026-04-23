import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, ArrowUpDown, CreditCard, Sparkles, Users, Zap, X, CheckCircle2 } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { MapCanvas } from "../components/MapCanvas";
import { TopBar } from "../components/TopBar";

export const Route = createFileRoute("/booking")({
  validateSearch: (search: Record<string, unknown>) => ({
    instant: search.instant === true || search.instant === "true" || search.instant === "1",
  }),
  component: BookingPage,
});

const rides = [
  { id: "ease", name: "Ease", tag: "Nearby", price: 20.58, eta: "2 min", co2: "1.2", seats: 4, emoji: "🚗" },
  { id: "premium", name: "Premium", tag: "0.3 km", price: 27.08, eta: "5 min", co2: "1.4", seats: 4, emoji: "🚙", featured: true },
  { id: "luxury", name: "Luxury", tag: "2 km", price: 40.11, eta: "12 min", co2: "1.8", seats: 4, emoji: "🏎️" },
  { id: "bike", name: "Bike", tag: "0.1 km", price: 14.11, eta: "2 min", co2: "0.3", seats: 1, emoji: "🛵" },
];

function BookingPage() {
  const navigate = useNavigate();
  const { instant } = Route.useSearch();
  const [pickup, setPickup] = useState("North York");
  const [drop, setDrop] = useState("Radiate Show");
  const [selected, setSelected] = useState("premium");
  const [split, setSplit] = useState(false);
  const [smartPickup, setSmartPickup] = useState(false);
  const [instantOpen, setInstantOpen] = useState(false);

  const ride = rides.find((r) => r.id === selected)!;

  useEffect(() => {
    if (instant) setInstantOpen(true);
  }, [instant]);

  return (
    <AppShell>
      <TopBar title="Book a ride" />

      {/* Map preview */}
      <div className="relative mx-5 h-44 overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
        <MapCanvas variant="route" className="h-full w-full" />
        <div className="absolute bottom-2 left-2 rounded-full border border-border bg-card/95 px-2.5 py-1 text-[11px] font-medium backdrop-blur">
          ETA {ride.eta} · {ride.co2}kg CO₂
        </div>
      </div>

      {/* Address inputs */}
      <div className="mx-5 mt-4 rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-3 px-3 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground" />
          <input
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Pickup location"
          />
        </div>
        <div className="my-1 ml-[18px] h-px bg-border" />
        <div className="flex items-center gap-3 px-3 py-3">
          <MapPin className="h-3.5 w-3.5 text-foreground" />
          <input
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Drop-off"
          />
          <button className="text-muted-foreground hover:text-foreground">
            <ArrowUpDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* AI suggestion banner */}
      <button
        onClick={() => setInstantOpen(true)}
        className={`mx-5 mt-3 flex w-[calc(100%-2.5rem)] items-center gap-3 rounded-2xl border bg-card p-3 text-left transition-all hover:border-foreground/20 ${
          smartPickup ? "border-foreground" : "border-border"
        }`}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground">
          <Sparkles className="h-4 w-4 text-background" />
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-semibold">AI Smart Pickup · Instant book</p>
          <p className="text-[11px] text-muted-foreground">
            {smartPickup ? "Applied · Hyatt corner pickup" : "Walk 40m to Hyatt corner — save $2.80 & 3 min"}
          </p>
        </div>
        <span className="text-[11px] font-medium">{smartPickup ? "On" : "Use"}</span>
      </button>

      {/* Ride options */}
      <div className="mx-5 mt-5">
        <p className="mb-2 text-[13px] font-semibold">Choose your ride</p>
        <div className="space-y-2">
          {rides.map((r) => {
            const active = selected === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                className={`relative flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                  active
                    ? "border-foreground bg-card shadow-[var(--shadow-card)]"
                    : "border-border bg-card hover:border-foreground/20"
                }`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-2xl">
                  {r.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{r.name}</p>
                    {r.featured && (
                      <span className="rounded-full bg-foreground/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-foreground">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {r.tag} · {r.eta} · {r.co2}kg CO₂
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-base font-semibold">${r.price}</p>
                  <p className="text-[11px] text-muted-foreground">{r.seats} seats</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Split fare */}
      <div className="mx-5 mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
          <Users className="h-4 w-4 text-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-semibold">Split fare</p>
          <p className="text-[11px] text-muted-foreground">
            {split ? `Each pays $${(ride.price / 2).toFixed(2)} · share via QR` : "Tap to enable"}
          </p>
        </div>
        <button
          onClick={() => setSplit(!split)}
          className={`relative h-6 w-11 rounded-full transition-all ${
            split ? "bg-foreground" : "bg-border"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow-sm transition-all ${
              split ? "left-[22px]" : "left-0.5"
            }`}
          />
        </button>
      </div>

      {/* Payment + book */}
      <div className="mx-5 mt-4">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-foreground" />
              <span className="text-[13px] font-medium">Apple Pay</span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">•••• 4242</span>
            </div>
            <button className="text-[11px] font-medium text-foreground">Change</button>
          </div>
        </div>

        <button
          onClick={() => navigate({ to: "/confirm" })}
          className="mt-3 w-full rounded-2xl bg-primary py-4 text-center text-[15px] font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.99]"
        >
          Book now · ${ride.price}
        </button>
      </div>

      {/* Instant Book sheet */}
      {instantOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/30 backdrop-blur-sm">
          <div className="w-full max-w-[480px] rounded-t-3xl border-t border-border bg-card p-6 shadow-[var(--shadow-elegant)]">
            <div className="mx-auto h-1 w-10 rounded-full bg-border" />
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground">
                  <Zap className="h-4 w-4 text-background" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Instant book</h2>
                  <p className="text-[11px] text-muted-foreground">AI Smart Pickup · 1 tap</p>
                </div>
              </div>
              <button onClick={() => setInstantOpen(false)} className="text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-2 rounded-2xl border border-border bg-secondary/40 p-3">
              <Row label="Pickup" value="Hyatt corner (40m walk)" />
              <Row label="Drop" value={drop} />
              <Row label="Ride" value={`${ride.name} · ${ride.eta}`} />
              <Row label="Pay" value="Apple Pay · •••• 4242" />
              <div className="my-1 h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  Total <span className="ml-1 text-[11px] text-success">−$2.80</span>
                </span>
                <span className="text-lg font-semibold">${(ride.price - 2.8).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSmartPickup(true);
                setInstantOpen(false);
                navigate({ to: "/confirm" });
              }}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-center text-[15px] font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.99]"
            >
              <CheckCircle2 className="h-4 w-4" /> Confirm & book
            </button>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Tap once — driver dispatched instantly
            </p>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}
