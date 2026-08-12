interface MarqueeProps {
  items: string[];
  speed?: "normal" | "fast";
  tone?: "lime" | "grape";
}

export function Marquee({ items, speed = "normal", tone = "lime" }: MarqueeProps) {
  const track = [...items, ...items];
  const animation = speed === "fast" ? "animate-marquee-fast" : "animate-marquee";
  const toneClasses =
    tone === "lime" ? "bg-lime text-cocoa" : "bg-grape text-cream";

  return (
    <div
      className={`overflow-hidden border-y-2 border-cocoa py-3 ${toneClasses}`}
      role="presentation"
    >
      <div className={`flex w-max gap-8 ${animation} motion-reduce:animate-none`}>
        {track.map((item, index) => (
          <span
            key={index}
            className="font-display flex items-center gap-8 text-lg uppercase sm:text-xl"
            aria-hidden={index >= items.length}
          >
            {item}
            <span aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
