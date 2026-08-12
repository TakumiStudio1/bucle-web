interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as = "h2",
  className,
}: SectionHeadingProps) {
  const Heading = as;
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  const eyebrowColor = tone === "dark" ? "text-strawberry" : "text-lime";
  const titleColor = tone === "dark" ? "text-cocoa" : "text-cream";
  const descColor = tone === "dark" ? "text-cocoa/70" : "text-cream/80";

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className ?? ""}`}>
      {eyebrow ? (
        <span
          className={`font-sans text-xs font-bold tracking-[0.3em] uppercase ${eyebrowColor}`}
        >
          {eyebrow}
        </span>
      ) : null}
      <Heading
        className={`font-display text-4xl uppercase sm:text-5xl lg:text-6xl ${titleColor}`}
      >
        {title}
      </Heading>
      {description ? (
        <p className={`max-w-xl text-base sm:text-lg ${descColor}`}>{description}</p>
      ) : null}
    </div>
  );
}
