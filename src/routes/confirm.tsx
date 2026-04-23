import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CheckCircle2, MessageCircle, Phone, Shield, Share2, X, Star, Radar, UserCheck, Loader2 } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { MapCanvas } from "../components/MapCanvas";
import { TopBar } from "../components/TopBar";

export const Route = createFileRoute("/confirm")({
  component: ConfirmPage,
});

const reasons = [
  { icon: "⏳", label: "Wait time was too long" },
  { icon: "🚫", label: "Could not find driver" },
  { icon: "✕", label: "Driver asked me to cancel" },
  { icon: "🚗", label: "Driver arrived early" },
];

function ConfirmPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<"searching" | "matching" | "confirmed" | "driver" | "cancel">("searching");
  const [eta, setEta] = useState(120);
  const [shieldOn, setShieldOn] = useState(true);
  const [shareContacts, setShareContacts] = useState([
    { name: "Maya", label: "Sister", initials: "MS" },
    { name: "Noah", label: "Friend", initials: "NF" },
  ]);

  const handleShareEdit = () => {
    setShareContacts((current) =>
      current.length === 2
        ? [...current, { name: "Ava", label: "Roommate", initials: "AR" }]
        : current.slice(0, 2),
    );
  };

  const removeShareContact = (name: string) => {
    setShareContacts((current) => current.filter((contact) => contact.name !== name));
  };

  useEffect(() => {
    const t = setInterval(() => setEta((e) => Math.max(0, e - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (stage === "searching") {
      const t = setTimeout(() => setStage("matching"), 2000);
      return () => clearTimeout(t);
    }
    if (stage === "matching") {
      const t = setTimeout(() => setStage("confirmed"), 2000);
      return () => clearTimeout(t);
    }
  }, [stage]);

  if (stage === "searching" || stage === "matching") {
    const isMatching = stage === "matching";
    const steps = [
      { key: "searching", label: "Scanning nearby drivers", icon: Radar },
      { key: "matching", label: "Matching best ride", icon: UserCheck },
      { key: "confirmed", label: "Confirming pickup", icon: CheckCircle2 },
    ];
    const activeIdx = isMatching ? 1 : 0;

    return (
      <AppShell>
        <TopBar title="Booking" back="/booking" />
        <div className="relative mx-5 h-[420px] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
          <MapCanvas variant="route" className="h-full w-full" />

          {/* Pulse rings */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/30 animate-ping" />
            <span
              className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/15 animate-ping"
              style={{ animationDelay: "0.6s" }}
            />
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="min-w-[220px] rounded-2xl border border-border bg-card px-6 py-5 text-center shadow-[var(--shadow-elegant)]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                {isMatching ? (
                  <UserCheck className="h-6 w-6 text-foreground" />
                ) : (
                  <Radar className="h-6 w-6 text-foreground animate-pulse" />
                )}
              </div>
              <p className="mt-3 text-base font-semibold">
                {isMatching ? "Driver found" : "Finding your ride"}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {isMatching ? "Locking in pickup..." : "Scanning nearby..."}
              </p>
              <div className="mt-3 flex justify-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-bounce" style={{ animationDelay: "0.15s" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-bounce" style={{ animationDelay: "0.3s" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Step tracker */}
        <div className="mx-5 mt-4 space-y-3 rounded-2xl border border-border bg-card p-4">
          {steps.map((s, i) => {
            const done = i < activeIdx;
            const active = i === activeIdx;
            const Icon = s.icon;
            return (
              <div key={s.key} className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                    done ? "bg-success/15" : active ? "bg-foreground" : "bg-secondary"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : active ? (
                    <Loader2 className="h-4 w-4 text-background animate-spin" />
                  ) : (
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <span className={`text-sm ${active ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </AppShell>
    );
  }

  if (stage === "confirmed") {
    return (
      <AppShell>
        <TopBar title="Confirmed" back="/booking" />
        <div className="relative mx-5 h-[420px] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
          <MapCanvas variant="route" className="h-full w-full" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="rounded-2xl border border-border bg-card px-6 py-5 text-center shadow-[var(--shadow-elegant)]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/15">
                <CheckCircle2 className="h-7 w-7 text-success" />
              </div>
              <p className="mt-3 text-base font-semibold">Confirmed</p>
              <p className="text-[11px] text-muted-foreground">Arriving in 2 min</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setStage("driver")}
          className="mx-5 mt-5 w-full rounded-2xl bg-primary py-4 font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.99]"
        >
          View driver details
        </button>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <TopBar title="Live trip" back="/home" />

      <div className="relative mx-5 h-56 overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
        <MapCanvas variant="route" className="h-full w-full" />
        <div className="absolute left-3 top-3 rounded-2xl border border-border bg-card/95 px-3 py-2 backdrop-blur">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Arriving</p>
          <p className="text-lg font-semibold">
            {Math.floor(eta / 60)}:{String(eta % 60).padStart(2, "0")}
          </p>
        </div>
        <div className="absolute right-3 top-3 rounded-full border border-border bg-card/95 px-3 py-1.5 text-[11px] font-medium backdrop-blur">
          OTP <span className="ml-1 text-base font-bold">309</span>
        </div>
      </div>

      <div className="mx-5 mt-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-success" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Krimy Shah</p>
            <div className="mt-0.5 flex items-center gap-1">
              <Star className="h-3 w-3 fill-foreground text-foreground" />
              <span className="text-xs">4.8</span>
              <span className="text-[10px] text-muted-foreground">· 1.2k trips</span>
            </div>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-secondary">
            <MessageCircle className="h-4 w-4 text-foreground" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-secondary">
            <Phone className="h-4 w-4 text-foreground" />
          </button>
        </div>

        <div className="my-3 h-px bg-border" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Vehicle</p>
            <p className="text-sm font-medium">Nissan GTR · Black</p>
          </div>
          <div className="rounded-xl bg-secondary px-3 py-2 text-center">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Plate</p>
            <p className="text-sm font-bold tracking-wider">ON GTR 999</p>
          </div>
        </div>
      </div>

      <div className="mx-5 mt-3 rounded-2xl border border-border bg-card p-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${shieldOn ? "bg-success/15" : "bg-secondary"}`}>
            <Shield className={`h-4 w-4 ${shieldOn ? "text-success" : "text-muted-foreground"}`} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold">SafetyShield {shieldOn ? "active" : "off"}</p>
            <p className="text-[11px] text-muted-foreground">
              {shieldOn
                ? `Sharing live location with ${shareContacts.length} contact${shareContacts.length === 1 ? "" : "s"}`
                : "Tap to enable trip share"}
            </p>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card">
            <Share2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleShareEdit}
            className="rounded-full border border-border bg-card px-3 py-2 text-[11px] font-medium transition-all hover:bg-secondary"
          >
            Edit
          </button>
          <button
            onClick={() => setShieldOn(!shieldOn)}
            className={`relative h-6 w-11 rounded-full transition-all ${shieldOn ? "bg-success" : "bg-border"}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow-sm transition-all ${
                shieldOn ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
        </div>

        {shieldOn && (
          <>
            <div className="mt-3 flex flex-wrap gap-2">
              {shareContacts.map((contact) => (
                <button
                  key={contact.name}
                  onClick={() => removeShareContact(contact.name)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-2.5 py-1.5 transition-all hover:bg-secondary"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                    {contact.initials}
                  </span>
                  <span className="text-xs">
                    {contact.name}
                    <span className="ml-1 text-[10px] text-muted-foreground">{contact.label}</span>
                  </span>
                  <X className="h-3 w-3 text-muted-foreground" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mx-5 mt-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">$27.08</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">via</p>
            <p className="text-sm">Apple Pay</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setStage("cancel")}
        className="mx-5 mt-3 w-full rounded-2xl border border-destructive/30 bg-destructive/[0.06] py-3.5 font-semibold text-destructive transition-all hover:bg-destructive/10"
      >
        Cancel booking
      </button>

      {stage === "cancel" && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/30 backdrop-blur-sm">
          <div className="w-full max-w-[480px] rounded-t-3xl border-t border-border bg-card p-6 shadow-[var(--shadow-elegant)]">
            <div className="mx-auto h-1 w-10 rounded-full bg-border" />
            <div className="mt-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Cancel trip?</h2>
              <button onClick={() => setStage("driver")} className="text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Why do you want to cancel?</p>

            <div className="mt-4 space-y-2">
              {reasons.map((r, i) => (
                <button
                  key={i}
                  className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left transition-all hover:border-destructive/40"
                >
                  <span className="text-lg">{r.icon}</span>
                  <span className="text-sm">{r.label}</span>
                </button>
              ))}
            </div>

            <Link
              to="/home"
              className="mt-4 flex w-full items-center justify-center rounded-2xl bg-destructive py-3.5 font-semibold text-destructive-foreground transition-all hover:opacity-90"
            >
              Confirm cancel
            </Link>
          </div>
        </div>
      )}
    </AppShell>
  );
}
