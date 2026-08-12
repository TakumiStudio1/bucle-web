import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LoopIcon } from "@/components/brand/LoopIcon";

const CATEGORIES = [
  { label: "Clásicos", href: "/carta?filtro=clasicos" },
  { label: "Rellenos", href: "/carta?filtro=rellenos" },
  { label: "Especiales", href: "/carta#donuts" },
  { label: "Cajas", href: "/carta#cajas" },
  { label: "Café", href: "/carta#cafe" },
  { label: "Bebidas frías", href: "/carta#frios" },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Elige tu vuelta" title="¿Cómo entras en el bucle?" />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {CATEGORIES.map((category) => (
          <Link
            key={category.label}
            href={category.href}
            className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-cocoa/10 bg-cream px-4 py-8 text-center transition-colors hover:border-grape hover:bg-grape/5"
          >
            <LoopIcon className="h-8 w-8 text-strawberry transition-transform group-hover:rotate-45" />
            <span className="font-display text-sm uppercase text-cocoa">
              {category.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
