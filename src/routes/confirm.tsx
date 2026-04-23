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
  const [stage, setStage] = useState<"confirmed" | "driver" | "cancel">("confirmed");
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

  if (stage === "confirmed") {
    return (
      <AppShell>
        <TopBar title="Confirming" back="/booking" />
        <div className="relative mx-5 h-[420px] overflow-hidden rounded-3xl glass">
          <MapCanvas variant="route" className="h-full w-full" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="glass-strong rounded-2xl px-6 py-5 text-center animate-float">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
                <CheckCircle2 className="h-7 w-7 text-success" />
              </div>
              <p className="mt-3 text-base font-medium">Confirmed</p>
              <p className="font-mono text-xs text-muted-foreground">Arriving in 2 min</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setStage("driver")}
          className="mx-5 mt-5 w-full rounded-2xl py-4 font-medium text-neon-foreground transition-all hover:scale-[1.02]"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-neon)" }}
        >
          View driver details
        </button>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <TopBar title="Live Trip" back="/home" />

      <div className="relative mx-5 h-56 overflow-hidden rounded-3xl glass">
        <MapCanvas variant="route" className="h-full w-full" />
        <div className="absolute left-3 top-3 glass-strong rounded-2xl px-3 py-2">
          <p className="font-mono text-[10px] uppercase text-muted-foreground">Arriving</p>
          <p className="font-mono text-lg font-bold gradient-text">
            {Math.floor(eta / 60)}:{String(eta % 60).padStart(2, "0")}
          </p>
        </div>
        <div className="absolute right-3 top-3 glass rounded-full px-3 py-1.5 font-mono text-[10px]">
          OTP · <span className="text-primary text-base font-bold">309</span>
        </div>
      </div>

      <div className="mx-5 mt-4 glass-strong rounded-3xl p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-violet" />
            <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-card bg-success" />
          </div>
          <div className="flex-1">
            <p className="font-medium">Krimy Shah</p>
            <div className="mt-0.5 flex items-center gap-1">
              <Star className="h-3 w-3 fill-warn text-warn" />
              <span className="font-mono text-xs">4.8</span>
              <span className="font-mono text-[10px] text-muted-foreground">· 1.2k trips</span>
            </div>
          </div>
          <button className="glass flex h-10 w-10 items-center justify-center rounded-full glow-violet">
            <MessageCircle className="h-4 w-4 text-violet" />
          </button>
          <button className="glass flex h-10 w-10 items-center justify-center rounded-full glow-violet">
            <Phone className="h-4 w-4 text-violet" />
          </button>
        </div>

        <div className="my-3 h-px bg-border" />

        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase text-muted-foreground">Vehicle</p>
            <p className="text-sm font-medium">Nissan GTR · Black</p>
          </div>
          <div className="rounded-xl bg-input px-3 py-2 text-center">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">Plate</p>
            <p className="font-mono text-sm font-bold tracking-wider">GJ01 KS 999</p>
          </div>
        </div>
      </div>

      <div className="mx-5 mt-3 glass rounded-2xl p-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${shieldOn ? "bg-success/20" : "bg-input"}`}>
            <Shield className={`h-4 w-4 ${shieldOn ? "text-success" : "text-muted-foreground"}`} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium">SafetyShield {shieldOn ? "Active" : "Off"}</p>
            <p className="font-mono text-[10px] text-muted-foreground">
              {shieldOn
                ? `Sharing live location with ${shareContacts.length} contact${shareContacts.length === 1 ? "" : "s"}`
                : "Tap to enable trip share"}
            </p>
          </div>
          <button className="glass flex h-9 w-9 items-center justify-center rounded-full">
            <Share2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleShareEdit}
            className="glass rounded-full px-3 py-2 font-mono text-[10px] uppercase text-primary transition-all hover:border-primary/50"
          >
            Edit
          </button>
          <button
            onClick={() => setShieldOn(!shieldOn)}
            className={`relative h-6 w-11 rounded-full transition-all ${shieldOn ? "bg-success" : "bg-input"}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition-all ${
                shieldOn ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
        </div>

        {shieldOn && (
          <>
            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              {shareContacts.map((contact) => (
                <button
                  key={contact.name}
                  onClick={() => removeShareContact(contact.name)}
                  className="glass inline-flex items-center gap-2 rounded-full px-2.5 py-2 transition-all hover:border-primary/50"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 font-mono text-[10px] text-primary">
                    {contact.initials}
                  </span>
                  <span className="text-xs">
                    {contact.name}
                    <span className="ml-1 font-mono text-[10px] text-muted-foreground">{contact.label}</span>
                  </span>
                  <X className="h-3 w-3 text-muted-foreground" />
                </button>
              ))}
            </div>
            <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground sm:text-left">
              Tap a contact to stop sharing or use Edit to update the list.
            </p>
          </>
        )}
      </div>

      <div className="mx-5 mt-3 glass rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase text-muted-foreground">Total</p>
            <p className="font-mono text-2xl font-bold">$27.08</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">via</p>
            <p className="text-sm">Apple Pay</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setStage("cancel")}
        className="mx-5 mt-3 w-full rounded-2xl bg-destructive py-3.5 font-medium text-destructive-foreground transition-all hover:opacity-90"
      >
        Cancel Booking
      </button>

      {stage === "cancel" && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 backdrop-blur-sm">
          <div className="glass-strong w-full max-w-[480px] rounded-t-3xl p-6 animate-in slide-in-from-bottom">
            <div className="mx-auto h-1 w-10 rounded-full bg-border" />
            <div className="mt-4 flex items-center justify-between">
              <h2 className="text-xl font-medium">Cancel Trip?</h2>
              <button onClick={() => setStage("driver")} className="text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Why do you want to cancel?</p>

            <div className="mt-4 space-y-2">
              {reasons.map((r, i) => (
                <button
                  key={i}
                  className="glass flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-all hover:border-destructive/50"
                >
                  <span className="text-lg">{r.icon}</span>
                  <span className="text-sm">{r.label}</span>
                </button>
              ))}
            </div>

            <Link
              to="/home"
              className="mt-4 flex w-full items-center justify-center rounded-2xl bg-destructive py-3.5 font-medium text-destructive-foreground"
            >
              Confirm Cancel
            </Link>
          </div>
        </div>
      )}
    </AppShell>
  );
}
