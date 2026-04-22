/* Animated futuristic map canvas — radial pulse, grid, route line */
export function MapCanvas({
  variant = "default",
  className = "",
}: {
  variant?: "default" | "route" | "search";
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Base */}
      <div className="absolute inset-0 grid-bg" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, oklch(0.65 0.24 295 / 0.25), transparent 55%), radial-gradient(ellipse at 80% 90%, oklch(0.85 0.18 195 / 0.2), transparent 50%)",
        }}
      />

      {/* Faux streets */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.85 0.18 195)" />
            <stop offset="100%" stopColor="oklch(0.65 0.24 295)" />
          </linearGradient>
        </defs>
        {/* streets */}
        <g stroke="oklch(1 0 0 / 0.06)" strokeWidth="1">
          <path d="M -10 80 Q 200 60 420 140" fill="none" />
          <path d="M -10 220 Q 180 200 420 260" fill="none" />
          <path d="M 60 -10 Q 80 200 140 420" fill="none" />
          <path d="M 280 -10 Q 300 200 360 420" fill="none" />
        </g>
        {variant !== "search" && (
          <>
            <path
              d="M 50 320 Q 160 220 220 200 T 360 80"
              fill="none"
              stroke="url(#route)"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-dash"
            />
            <circle cx="50" cy="320" r="6" fill="oklch(0.85 0.18 195)" />
            <circle cx="50" cy="320" r="14" fill="oklch(0.85 0.18 195 / 0.25)" />
            <circle cx="360" cy="80" r="6" fill="oklch(0.65 0.24 295)" />
          </>
        )}
      </svg>

      {/* Pulse beacon */}
      {variant === "search" && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <span className="absolute inset-0 -m-8 rounded-full bg-primary/40 animate-pulse-ring" />
            <span className="absolute inset-0 -m-8 rounded-full bg-primary/30 animate-pulse-ring [animation-delay:0.8s]" />
            <div className="relative h-5 w-5 rounded-full bg-primary glow-neon" />
          </div>
        </div>
      )}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, oklch(0.13 0.02 270 / 0.85) 100%)",
        }}
      />
    </div>
  );
}
