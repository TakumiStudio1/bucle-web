import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LegalDisclaimer, LegalSection } from "@/components/misc/LegalSection";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Política de cookies de demostración de BUCLE.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <SectionHeading as="h1" eyebrow="Legal" title="Cookies" className="mb-8" />
      <div className="flex flex-col gap-8">
        <LegalDisclaimer />
        <LegalSection title="1. Categorías">
          <ul className="list-disc pl-5">
            <li>
              <strong>Necesarias:</strong> siempre activas — permiten el
              funcionamiento del carrito y la navegación.
            </li>
            <li>
              <strong>Analíticas:</strong> desactivadas por defecto. En esta
              demo no se carga ninguna herramienta analítica real aunque se
              activen.
            </li>
            <li>
              <strong>Marketing:</strong> desactivadas por defecto. Tampoco
              se activa ninguna herramienta real en esta demo.
            </li>
          </ul>
        </LegalSection>
        <LegalSection title="2. Cómo cambiar tu preferencia">
          <p>
            Puedes modificar tu elección en cualquier momento desde el enlace
            &ldquo;Preferencias de cookies&rdquo; en el pie de página.
          </p>
        </LegalSection>
      </div>
    </div>
  );
}
