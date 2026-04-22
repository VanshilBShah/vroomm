import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Star, Gift, Bell, History, CreditCard, UserPlus, HelpCircle, Settings,
  ChevronRight, Leaf, Shield, Sparkles, LogOut,
} from "lucide-react";
import { AppShell } from "../components/AppShell";
import { TopBar } from "../components/TopBar";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

const programs = [
  { icon: Gift, label: "Rewards", sub: "1,240 pts · Gold tier" },
  { icon: Sparkles, label: "VRoooM+", sub: "Unlock priority pickup" },
];

const account = [
  { icon: Bell, label: "Notifications" },
  { icon: History, label: "Ride History" },
  { icon: CreditCard, label: "Payment" },
  { icon: Shield, label: "Safety Contacts" },
  { icon: UserPlus, label: "Refer a Friend", badge: "$10" },
  { icon: HelpCircle, label: "Help & Support" },
  { icon: Settings, label: "Settings" },
];

function ProfilePage() {
  return (
    <AppShell>
      <TopBar title="My Profile" back={false} />

      {/* Hero */}
      <div className="mx-5 glass-strong rounded-3xl p-5 relative overflow-hidden">
        <div
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--gradient-primary)" }}
        />
        <div className="relative flex items-center gap-4">
          <div className="relative">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-violet" />
            <button className="absolute -bottom-1 -right-1 glass-strong rounded-full px-2 py-0.5 font-mono text-[9px] uppercase">
              Edit
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Vanshil Shah</h2>
            <div className="mt-0.5 flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-warn text-warn" />
              <span className="font-mono text-sm">4.5</span>
              <span className="font-mono text-[11px] text-muted-foreground">· Gold</span>
            </div>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">+1 ••• ••• 9012</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <Stat value="142" label="Trips" />
          <Stat value="4.9" label="Rating" />
          <Stat value="1.2k" label="Points" />
        </div>
      </div>

      {/* Eco card — UNIQUE */}
      <div className="mx-5 mt-4 glass rounded-2xl p-4 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/20">
            <Leaf className="h-5 w-5 text-success" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Carbon Saved</p>
            <p className="font-mono text-[11px] text-muted-foreground">By choosing pool & eco rides</p>
          </div>
          <p className="font-mono text-2xl font-bold text-success">12.4<span className="text-xs">kg</span></p>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-input">
          <div className="h-full rounded-full bg-success animate-aurora" style={{ width: "62%", background: "linear-gradient(90deg, var(--success), var(--neon))" }} />
        </div>
        <p className="mt-1.5 font-mono text-[10px] text-muted-foreground">62% to next badge: Eco Champion 🌳</p>
      </div>

      {/* Programs */}
      <Section title="Programs">
        {programs.map(({ icon: Icon, label, sub }) => (
          <Item key={label} icon={Icon} label={label} sub={sub} />
        ))}
      </Section>

      <Section title="Account">
        {account.map(({ icon: Icon, label, badge }) => (
          <Item key={label} icon={Icon} label={label} badge={badge} />
        ))}
      </Section>

      <Link
        to="/"
        className="mx-5 mt-2 flex items-center justify-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 py-3.5 text-sm font-medium text-destructive transition-all hover:bg-destructive/20"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </Link>
    </AppShell>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass rounded-xl py-2.5 text-center">
      <p className="font-mono text-base font-bold gradient-text">{value}</p>
      <p className="font-mono text-[10px] uppercase text-muted-foreground">{label}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-5 mt-5">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        {title}
      </p>
      <div className="glass-strong rounded-2xl divide-y divide-border/50">{children}</div>
    </div>
  );
}

function Item({
  icon: Icon,
  label,
  sub,
  badge,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub?: string;
  badge?: string;
}) {
  return (
    <button className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-all hover:bg-input/30 first:rounded-t-2xl last:rounded-b-2xl">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-input/60">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        {sub && <p className="font-mono text-[10px] text-muted-foreground">{sub}</p>}
      </div>
      {badge && (
        <span className="rounded-full bg-primary/20 px-2 py-0.5 font-mono text-[10px] text-primary">
          {badge}
        </span>
      )}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
