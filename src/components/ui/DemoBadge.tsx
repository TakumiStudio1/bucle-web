interface DemoBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function DemoBadge({ children, className }: DemoBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border-2 border-strawberry bg-cream px-3 py-1 text-[0.65rem] font-bold tracking-[0.15em] text-strawberry uppercase ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
