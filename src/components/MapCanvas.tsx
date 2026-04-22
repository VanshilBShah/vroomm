/* Animated futuristic map canvas — streets, blocks, parks, route line, beacons */
export function MapCanvas({
  variant = "default",
  className = "",
}: {
  variant?: "default" | "route" | "search";
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Deep base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.18 0.04 270) 0%, oklch(0.14 0.03 275) 50%, oklch(0.16 0.05 290) 100%)",
        }}
      />
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Aurora glow blobs */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 25% 25%, oklch(0.65 0.24 295 / 0.32), transparent 50%), radial-gradient(ellipse at 78% 80%, oklch(0.85 0.18 195 / 0.28), transparent 50%)",
        }}
      />

      {/* Map SVG — streets, blocks, water, parks */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.85 0.18 195)" />
            <stop offset="100%" stopColor="oklch(0.65 0.24 295)" />
          </linearGradient>
          <linearGradient id="water" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.4 0.12 230 / 0.4)" />
            <stop offset="100%" stopColor="oklch(0.3 0.1 250 / 0.25)" />
          </linearGradient>
          <pattern id="parkDots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.7" fill="oklch(0.78 0.18 155 / 0.45)" />
          </pattern>
        </defs>

        {/* Water body */}
        <path
          d="M -20 280 Q 80 250 160 290 T 340 300 L 420 320 L 420 420 L -20 420 Z"
          fill="url(#water)"
        />

        {/* Park / green block */}
        <rect x="240" y="60" width="90" height="70" rx="6" fill="oklch(0.4 0.14 155 / 0.18)" />
        <rect x="240" y="60" width="90" height="70" rx="6" fill="url(#parkDots)" />

        {/* City blocks (subtle filled rects) */}
        <g fill="oklch(0.22 0.03 275 / 0.55)" stroke="oklch(1 0 0 / 0.05)">
          <rect x="20" y="40" width="70" height="50" rx="4" />
          <rect x="100" y="30" width="60" height="60" rx="4" />
          <rect x="170" y="50" width="55" height="45" rx="4" />
          <rect x="20" y="110" width="50" height="60" rx="4" />
          <rect x="80" y="110" width="80" height="60" rx="4" />
          <rect x="170" y="110" width="55" height="60" rx="4" />
          <rect x="20" y="190" width="65" height="55" rx="4" />
          <rect x="95" y="190" width="55" height="55" rx="4" />
          <rect x="160" y="190" width="65" height="55" rx="4" />
          <rect x="240" y="150" width="60" height="55" rx="4" />
          <rect x="310" y="150" width="60" height="55" rx="4" />
          <rect x="240" y="220" width="50" height="50" rx="4" />
          <rect x="300" y="220" width="70" height="50" rx="4" />
        </g>

        {/* Major streets */}
        <g stroke="oklch(1 0 0 / 0.18)" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M -10 100 L 410 100" />
          <path d="M -10 180 L 410 180" />
          <path d="M -10 260 L 410 260" />
          <path d="M 90 -10 L 90 410" />
          <path d="M 230 -10 L 230 410" />
        </g>
        {/* Minor streets */}
        <g stroke="oklch(1 0 0 / 0.08)" strokeWidth="1.2" fill="none">
          <path d="M -10 60 L 410 60" />
          <path d="M -10 140 L 410 140" />
          <path d="M -10 220 L 410 220" />
          <path d="M 40 -10 L 40 280" />
          <path d="M 160 -10 L 160 280" />
          <path d="M 300 -10 L 300 280" />
          <path d="M 360 -10 L 360 280" />
        </g>
        {/* Diagonal avenue */}
        <path
          d="M -10 30 Q 200 120 410 200"
          fill="none"
          stroke="oklch(1 0 0 / 0.12)"
          strokeWidth="2"
        />

        {/* Street labels */}
        <g
          fill="oklch(1 0 0 / 0.35)"
          fontSize="6"
          fontFamily="monospace"
          letterSpacing="1"
        >
          <text x="100" y="97">YONGE ST</text>
          <text x="240" y="177">FINCH AVE</text>
          <text x="95" y="200" transform="rotate(-90 95 200)">BAYVIEW</text>
        </g>

        {variant !== "search" && (
          <>
            {/* Route */}
            <path
              d="M 50 300 Q 120 240 160 220 T 250 150 T 360 70"
              fill="none"
              stroke="url(#route)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="animate-dash"
            />
            {/* Origin */}
            <circle cx="50" cy="300" r="14" fill="oklch(0.85 0.18 195 / 0.25)" />
            <circle cx="50" cy="300" r="6" fill="oklch(0.85 0.18 195)" />
            {/* Destination */}
            <circle cx="360" cy="70" r="14" fill="oklch(0.65 0.24 295 / 0.3)" />
            <circle cx="360" cy="70" r="6" fill="oklch(0.65 0.24 295)" />
          </>
        )}

        {/* Nearby driver dots */}
        <g>
          <circle cx="140" cy="160" r="3" fill="oklch(0.85 0.18 195)">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="280" cy="120" r="3" fill="oklch(0.85 0.18 195)">
            <animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="240" r="3" fill="oklch(0.85 0.18 195)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="320" cy="200" r="3" fill="oklch(0.65 0.24 295)">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2.6s" repeatCount="indefinite" />
          </circle>
        </g>
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
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, oklch(0.13 0.02 270 / 0.7) 100%)",
        }}
      />
    </div>
  );
}
