import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Facebook, Chrome, Apple } from "lucide-react";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  return (
    <div className="relative mx-auto flex min-h-screen max-w-[480px] flex-col px-6 pb-10 pt-16">
      {/* Logo */}
      <div className="text-center">
        <h1 className="font-mono text-6xl font-bold tracking-tight gradient-aurora-text animate-aurora">
          VRoooM
        </h1>
        <p className="mt-2 text-sm font-light tracking-[0.4em] text-muted-foreground uppercase">
          Move with Ease
        </p>
        <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      {/* Card */}
      <div className="glass-strong mt-12 rounded-3xl p-7">
        {step === "phone" ? (
          <>
            <h2 className="text-center text-2xl font-medium">Welcome back</h2>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              Sign in to summon your ride
            </p>

            <div className="mt-7 flex items-center gap-2 rounded-2xl border border-border bg-input/40 p-1.5 transition-all focus-within:border-primary focus-within:glow-neon">
              <button className="flex items-center gap-1.5 rounded-xl bg-background/50 px-3 py-2.5 font-mono text-sm">
                🇮🇳 +91
              </button>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="Phone number"
                inputMode="numeric"
                className="flex-1 bg-transparent px-2 font-mono text-base outline-none placeholder:text-muted-foreground/50"
              />
            </div>

            <button
              onClick={() => phone.length >= 6 && setStep("otp")}
              disabled={phone.length < 6}
              className="group mt-5 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 font-medium text-neon-foreground transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-neon)" }}
            >
              Continue
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </>
        ) : (
          <>
            <h2 className="text-center text-2xl font-medium">Verify it's you</h2>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              Code sent to <span className="font-mono text-primary">+91 {phone}</span>
            </p>

            <div className="mt-7 flex justify-center gap-3">
              {otp.map((d, i) => (
                <input
                  key={i}
                  value={d}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(-1);
                    const next = [...otp];
                    next[i] = v;
                    setOtp(next);
                    if (v && i < 3) {
                      const el = document.getElementById(`otp-${i + 1}`);
                      el?.focus();
                    }
                  }}
                  id={`otp-${i}`}
                  inputMode="numeric"
                  maxLength={1}
                  className="h-14 w-14 rounded-2xl border border-border bg-input/40 text-center font-mono text-2xl outline-none transition-all focus:border-primary focus:glow-neon"
                />
              ))}
            </div>

            <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
              Resend in <span className="text-primary">00:30</span>
            </p>

            <button
              onClick={() => navigate({ to: "/home" })}
              className="mt-5 w-full rounded-2xl py-3.5 font-medium text-neon-foreground transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-neon)" }}
            >
              Verify & Continue
            </button>
            <button
              onClick={() => setStep("phone")}
              className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              Change phone number
            </button>
          </>
        )}

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          OR
          <span className="h-px flex-1 bg-border" />
        </div>

        <p className="text-center text-xs text-muted-foreground">Continue with</p>
        <div className="mt-3 flex justify-center gap-3">
          {[Chrome, Apple, Facebook].map((Icon, i) => (
            <button
              key={i}
              onClick={() => navigate({ to: "/home" })}
              className="glass flex h-12 w-12 items-center justify-center rounded-2xl transition-all hover:scale-110 hover:border-primary"
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>

      <p className="mt-auto pt-8 text-center text-[11px] text-muted-foreground">
        By continuing you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
}
