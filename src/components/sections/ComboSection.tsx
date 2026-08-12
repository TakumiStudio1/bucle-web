import { SectionHeading } from "@/components/ui/SectionHeading";
import { BoxBuilder } from "@/components/commerce/BoxBuilder";

export function ComboSection() {
  return (
    <section id="cajas" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Para compartir. O no."
        title="El bucle viene en cajas."
        description="Elige el tamaño y completa la caja con tus sabores favoritos."
      />
      <div className="mt-10">
        <BoxBuilder />
      </div>
    </section>
  );
}
