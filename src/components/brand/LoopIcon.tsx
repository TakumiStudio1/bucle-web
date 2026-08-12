interface LoopIconProps {
  className?: string;
  color?: string;
}

/**
 * The BUCLE loop-arrow mark: an incomplete ring with an arrowhead,
 * standing in for the real vector icon at /public/brand until it exists.
 */
export function LoopIcon({ className, color = "currentColor" }: LoopIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M50 12a38 38 0 1 0 33 57"
        stroke={color}
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path d="M46 4 L74 15 L52 34 Z" fill={color} />
    </svg>
  );
}
