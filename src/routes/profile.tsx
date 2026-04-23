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
  { icon: History, label: "Ride history" },
  { icon: CreditCard, label: "Payment" },
  { icon: Shield, label: "Safety contacts" },
  { icon: UserPlus, label: "Refer a friend", badge: "$10" },
  { icon: HelpCircle, label: "Help & support" },
  { icon: Settings, label: "Settings" },
];

function ProfilePage() {
  return (
    <AppShell>
      <TopBar title="Profile" back={false} />

      {/* Hero */}
      <div className="mx-5 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-accent" />
            <button className="absolute -bottom-1 -right-1 rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-medium shadow-[var(--shadow-sm)]">
              Edit
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Vanshil Shah</h2>
            <div className="mt-0.5 flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
              <span className="text-sm">4.5</span>
              <span className="text-[11px] text-muted-foreground">· Gold</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">+1 ••• ••• 9012</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <Stat value="142" label="Trips" />
          <Stat value="4.9" label="Rating" />
          <Stat value="1.2k" label="Points" />
        </div>
      </div>

      {/* Eco card */}
      <div className="mx-5 mt-4 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-success/15">
            <Leaf className="h-5 w-5 text-success" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Carbon saved</p>
            <p className="text-[11px] text-muted-foreground">By choosing pool & eco rides</p>
          </div>
          <p className="text-2xl font-bold text-success">12.4<span className="text-xs font-medium">kg</span></p>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-success" style={{ width: "62%" }} />
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground">62% to next badge: Eco Champion 🌳</p>
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
        className="mx-5 mt-3 flex items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/[0.06] py-3.5 text-sm font-semibold text-destructive transition-all hover:bg-destructive/10"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </Link>
    </AppShell>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 py-2.5 text-center">
      <p className="text-base font-bold">{value}</p>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-5 mt-5">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <div className="divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden">{children}</div>
    </div>
  );
}

function Item({
  icon: Icon,
  label,
  sub,
  badge,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  sub?: string;
  badge?: string;
}) {
  return (
    <button className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-all hover:bg-secondary/50">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
        <Icon className="h-4 w-4 text-foreground" strokeWidth={1.8} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        {sub && <p className="text-[11px] text-muted-foreground">{sub}</p>}
      </div>
      {badge && (
        <span className="rounded-full bg-foreground/[0.06] px-2 py-0.5 text-[11px] font-medium text-foreground">
          {badge}
        </span>
      )}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
