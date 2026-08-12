import Link from "next/link";
import { brand } from "@/config/brand";

interface LogoProps {
  variant?: "grape" | "cream";
  showDescriptor?: boolean;
  className?: string;
}

/**
 * Temporary but production-quality wordmark component. Replace with real
 * brand files at /public/brand/bucle-wordmark.svg the day they exist —
 * this is the only place the logotype is drawn, so swapping it in means
 * editing just this component.
 */
export function Logo({
  variant = "grape",
  showDescriptor = false,
  className,
}: LogoProps) {
  const color = variant === "grape" ? "text-grape" : "text-cream";

  return (
    <Link
      href="/"
      className={`inline-flex flex-col items-start ${className ?? ""}`}
      aria-label={`${brand.name} — Inicio`}
    >
      <span
        className={`font-display flex text-3xl leading-none font-extrabold tracking-tight sm:text-4xl ${color}`}
      >
        <span>BU</span>
        <span className="bucle-bite">C</span>
        <span>LE</span>
      </span>
      {showDescriptor ? (
        <span
          className={`mt-1 text-[0.6rem] font-semibold tracking-[0.25em] uppercase ${color}`}
        >
          {brand.descriptor}
        </span>
      ) : null}
    </Link>
  );
}
