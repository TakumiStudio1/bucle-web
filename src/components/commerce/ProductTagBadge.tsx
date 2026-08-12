import type { ProductTag } from "@/types/menu";

const LABELS: Record<ProductTag, string> = {
  clasico: "Clásico",
  relleno: "Relleno",
  especial: "Especial",
  vegano: "Vegano",
  premium: "Premium",
  nuevo: "Nuevo",
  "mas-vendido": "Más vendido",
  "frutos-secos": "Frutos secos",
  vegetariano: "Vegetariano",
};

export function ProductTagBadge({ tag }: { tag: ProductTag }) {
  return (
    <span className="inline-flex items-center rounded-full bg-cocoa/5 px-2.5 py-1 text-[0.65rem] font-bold tracking-wide text-cocoa/70 uppercase">
      {LABELS[tag]}
    </span>
  );
}
