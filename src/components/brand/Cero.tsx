export type CeroPose = "normal" | "wink" | "sleepy" | "mischief";

interface CeroProps {
  pose?: CeroPose;
  ringColor?: string;
  bodyColor?: string;
  eyeColor?: string;
  className?: string;
  blink?: boolean;
}

/**
 * CERO, the BUCLE mascot: a dark circle with two cream eyes. No mouth, no
 * arms, no legs — never add them. Eyes may blink (CSS-driven, disabled
 * under prefers-reduced-motion by the global stylesheet).
 */
export function Cero({
  pose = "normal",
  ringColor,
  bodyColor = "var(--color-cocoa)",
  eyeColor = "var(--color-cream)",
  className,
  blink = false,
}: CeroProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {ringColor ? (
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke={ringColor}
          strokeWidth="8"
        />
      ) : null}
      <circle cx="100" cy="100" r="88" fill={bodyColor} />
      <g
        style={
          blink
            ? { transformOrigin: "100px 104px", animation: "blink 5s ease-in-out infinite" }
            : undefined
        }
      >
        <CeroEyes pose={pose} color={eyeColor} />
      </g>
    </svg>
  );
}

function CeroEyes({ pose, color }: { pose: CeroPose; color: string }) {
  switch (pose) {
    case "wink":
      return (
        <>
          <ellipse cx="76" cy="104" rx="14" ry="18" fill={color} />
          <rect x="112" y="100" width="24" height="8" rx="4" fill={color} />
        </>
      );
    case "sleepy":
      return (
        <>
          <path
            d="M62 104 Q76 118 90 104"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M110 104 Q124 118 138 104"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );
    case "mischief":
      return (
        <>
          <ellipse
            cx="76"
            cy="106"
            rx="15"
            ry="17"
            fill={color}
            transform="rotate(-8 76 106)"
          />
          <ellipse
            cx="124"
            cy="102"
            rx="15"
            ry="17"
            fill={color}
            transform="rotate(8 124 102)"
          />
        </>
      );
    case "normal":
    default:
      return (
        <>
          <ellipse cx="76" cy="104" rx="14" ry="18" fill={color} />
          <ellipse cx="124" cy="104" rx="14" ry="18" fill={color} />
        </>
      );
  }
}
