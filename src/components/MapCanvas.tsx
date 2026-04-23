/* Realistic light map canvas — clean streets, blocks, parks, route */
export function MapCanvas({
  variant = "default",
  className = "",
}: {
  variant?: "default" | "route" | "search";
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Map base — soft warm beige like Apple/Google Maps */}
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.96 0.008 85)" }}
      />

      {/* Map SVG — streets, blocks, water, parks */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.18 250)" />
            <stop offset="100%" stopColor="oklch(0.4 0.18 260)" />
          </linearGradient>
        </defs>

        {/* Water body */}
        <path
          d="M -20 290 Q 80 260 160 295 T 340 305 L 420 320 L 420 420 L -20 420 Z"
          fill="oklch(0.85 0.05 230)"
        />

        {/* Park / green block */}
        <rect x="240" y="60" width="90" height="70" rx="4" fill="oklch(0.88 0.07 145)" />

        {/* City blocks — light grey */}
        <g fill="oklch(0.93 0.005 85)" stroke="oklch(0.88 0.005 85)" strokeWidth="0.5">
          <rect x="20" y="40" width="70" height="50" rx="2" />
          <rect x="100" y="30" width="60" height="60" rx="2" />
          <rect x="170" y="50" width="55" height="45" rx="2" />
          <rect x="20" y="110" width="50" height="60" rx="2" />
          <rect x="80" y="110" width="80" height="60" rx="2" />
          <rect x="170" y="110" width="55" height="60" rx="2" />
          <rect x="20" y="190" width="65" height="55" rx="2" />
          <rect x="95" y="190" width="55" height="55" rx="2" />
          <rect x="160" y="190" width="65" height="55" rx="2" />
          <rect x="240" y="150" width="60" height="55" rx="2" />
          <rect x="310" y="150" width="60" height="55" rx="2" />
          <rect x="240" y="220" width="50" height="50" rx="2" />
          <rect x="300" y="220" width="70" height="50" rx="2" />
        </g>

        {/* Major streets — white */}
        <g stroke="oklch(1 0 0)" strokeWidth="6" fill="none" strokeLinecap="round">
          <path d="M -10 100 L 410 100" />
          <path d="M -10 180 L 410 180" />
          <path d="M -10 260 L 410 260" />
          <path d="M 90 -10 L 90 410" />
          <path d="M 230 -10 L 230 410" />
        </g>
        <g stroke="oklch(0.88 0.005 85)" strokeWidth="6.5" fill="none" strokeLinecap="round" opacity="0.5">
          <path d="M -10 100 L 410 100" />
          <path d="M -10 180 L 410 180" />
          <path d="M -10 260 L 410 260" />
          <path d="M 90 -10 L 90 410" />
          <path d="M 230 -10 L 230 410" />
        </g>
        <g stroke="oklch(1 0 0)" strokeWidth="5" fill="none" strokeLinecap="round">
          <path d="M -10 100 L 410 100" />
          <path d="M -10 180 L 410 180" />
          <path d="M -10 260 L 410 260" />
          <path d="M 90 -10 L 90 410" />
          <path d="M 230 -10 L 230 410" />
        </g>

        {/* Minor streets */}
        <g stroke="oklch(1 0 0)" strokeWidth="2.5" fill="none">
          <path d="M -10 60 L 410 60" />
          <path d="M -10 140 L 410 140" />
          <path d="M -10 220 L 410 220" />
          <path d="M 40 -10 L 40 280" />
          <path d="M 160 -10 L 160 280" />
          <path d="M 300 -10 L 300 280" />
          <path d="M 360 -10 L 360 280" />
        </g>

        {/* Street labels */}
        <g
          fill="oklch(0.55 0.01 260)"
          fontSize="7"
          fontFamily="ui-sans-serif, system-ui"
          fontWeight="500"
        >
          <text x="100" y="97">Yonge St</text>
          <text x="240" y="177">Finch Ave</text>
          <text x="83" y="200" transform="rotate(-90 83 200)">Bayview</text>
        </g>

        {variant !== "search" && (
          <>
            {/* Route */}
            <path
              d="M 50 300 Q 120 240 160 220 T 250 150 T 360 70"
              fill="none"
              stroke="url(#route)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Origin */}
            <circle cx="50" cy="300" r="8" fill="white" stroke="oklch(0.22 0.015 260)" strokeWidth="2.5" />
            {/* Destination */}
            <circle cx="360" cy="70" r="6" fill="oklch(0.22 0.015 260)" />
            <circle cx="360" cy="70" r="11" fill="none" stroke="oklch(0.22 0.015 260)" strokeWidth="1.5" opacity="0.3" />
          </>
        )}

        {/* Nearby car icons */}
        <g>
          <g transform="translate(140 160)">
            <rect x="-5" y="-3" width="10" height="6" rx="1.5" fill="oklch(0.22 0.015 260)" />
          </g>
          <g transform="translate(280 120) rotate(45)">
            <rect x="-5" y="-3" width="10" height="6" rx="1.5" fill="oklch(0.22 0.015 260)" />
          </g>
          <g transform="translate(200 240) rotate(-30)">
            <rect x="-5" y="-3" width="10" height="6" rx="1.5" fill="oklch(0.22 0.015 260)" />
          </g>
          <g transform="translate(320 200) rotate(90)">
            <rect x="-5" y="-3" width="10" height="6" rx="1.5" fill="oklch(0.22 0.015 260)" />
          </g>
        </g>
      </svg>

      {/* Pulse beacon */}
      {variant === "search" && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <span className="absolute inset-0 -m-6 rounded-full bg-accent/20 animate-pulse-ring" />
            <span className="absolute inset-0 -m-6 rounded-full bg-accent/15 animate-pulse-ring [animation-delay:0.8s]" />
            <div className="relative h-4 w-4 rounded-full bg-accent ring-4 ring-white" />
          </div>
        </div>
      )}
    </div>
  );
}
