import { Suspense } from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CartaExperience } from "@/components/commerce/CartaExperience";

export const metadata: Metadata = {
  title: "La carta",
  description:
    "Donuts, cajas, café y bebidas frías de BUCLE. Elige, añade y repite.",
};

export default function CartaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <SectionHeading
        as="h1"
        eyebrow="Donuts, café y vueltas"
        title="La carta"
        description="Elige. Añade. Repite."
        className="mb-10"
      />
      <Suspense fallback={null}>
        <CartaExperience />
      </Suspense>
    </div>
  );
}
