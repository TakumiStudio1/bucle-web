const DOUGH_COLORS: Record<string, string> = {
  clasica: "#E3A65A",
  cacao: "#5A3A2E",
  vegana: "#D9B36A",
};

interface DonutPreviewProps {
  base: string;
  glazeColor: string;
  topping: string;
  className?: string;
}

export function DonutPreview({
  base,
  glazeColor,
  topping,
  className,
}: DonutPreviewProps) {
  const dough = DOUGH_COLORS[base] ?? DOUGH_COLORS.clasica;

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <ellipse cx="100" cy="112" rx="88" ry="82" fill="rgba(34,19,15,0.15)" />
      <circle cx="100" cy="100" r="88" fill={dough} />
      <path
        d="M100 26 A74 74 0 1 1 26 100 A74 74 0 0 1 100 26 Z M100 66 A34 34 0 1 0 134 100 A34 34 0 0 0 100 66 Z"
        fill={glazeColor}
        fillRule="evenodd"
        transform="translate(0 -4)"
      />
      <path
        d="M28 94 A72 72 0 0 0 84 166"
        stroke={dough}
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <ToppingLayer topping={topping} />
    </svg>
  );
}

function ToppingLayer({ topping }: { topping: string }) {
  if (topping === "crujiente") {
    const dots = [
      [70, 55], [92, 42], [118, 46], [138, 62], [60, 78], [128, 82], [104, 40], [80, 90],
    ];
    return (
      <>
        {dots.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="5" fill="#B9875F" />
        ))}
      </>
    );
  }

  if (topping === "sprinkles") {
    const sprinkles = [
      [66, 50, "#FF586B", 20],
      [86, 40, "#CBFF3D", -15],
      [104, 44, "#FFF3DD", 40],
      [122, 54, "#FF586B", -30],
      [136, 70, "#CBFF3D", 10],
      [60, 70, "#FFF3DD", -20],
      [78, 88, "#FF586B", 25],
      [112, 90, "#CBFF3D", -10],
    ] as const;
    return (
      <>
        {sprinkles.map(([cx, cy, color, rotate], i) => (
          <rect
            key={i}
            x={cx - 6}
            y={cy - 1.5}
            width="12"
            height="3"
            rx="1.5"
            fill={color}
            transform={`rotate(${rotate} ${cx} ${cy})`}
          />
        ))}
      </>
    );
  }

  if (topping === "galleta") {
    const crumbs = [
      [70, 52, 7], [96, 40, 6], [120, 50, 8], [134, 68, 6], [64, 76, 6], [110, 84, 7],
    ] as const;
    return (
      <>
        {crumbs.map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="#8A5A34" opacity="0.9" />
        ))}
      </>
    );
  }

  return null;
}
