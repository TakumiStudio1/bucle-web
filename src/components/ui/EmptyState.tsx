import { Cero } from "@/components/brand/Cero";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
      <Cero pose="sleepy" className="h-20 w-20" bodyColor="var(--color-grape)" />
      <p className="font-display text-2xl uppercase text-grape">{title}</p>
      {description ? (
        <p className="max-w-sm text-sm text-cocoa/70">{description}</p>
      ) : null}
      {action}
    </div>
  );
}
