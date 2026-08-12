import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  onClick?: () => void;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: never;
}

const VARIANTS: Record<Variant, string> = {
  primary: "bg-lime text-cocoa hover:bg-lime-soft",
  secondary: "bg-cream text-grape hover:bg-white",
  ghost: "bg-transparent text-cream border-2 border-cream hover:bg-white/10",
  dark: "bg-grape text-cream hover:bg-grape-deep",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

function classes(variant: Variant, size: Size, className?: string) {
  return `font-display inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-wide transition-colors focus-visible:outline-offset-4 ${VARIANTS[variant]} ${SIZES[size]} ${className ?? ""}`;
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", children, className } = props;

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        onClick={props.onClick}
        className={classes(variant, size, className)}
      >
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- stripped so it isn't spread onto <button>
  const { href: _href, ...buttonProps } = props as ButtonAsButton;
  return (
    <button
      {...buttonProps}
      className={classes(variant, size, className)}
    >
      {children}
    </button>
  );
}
