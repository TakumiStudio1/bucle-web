import { Suspense } from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PedidoExperience } from "@/components/order/PedidoExperience";

export const metadata: Metadata = {
  title: "Pedido",
  description: "Cierra el círculo: revisa tu pedido de demostración de BUCLE.",
};

export default function PedidoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <SectionHeading
        as="h1"
        eyebrow="Tu pedido"
        title="Cierra el círculo."
        className="mb-10"
      />
      <Suspense fallback={null}>
        <PedidoExperience />
      </Suspense>
    </div>
  );
}
