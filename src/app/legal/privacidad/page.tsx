import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LegalDisclaimer, LegalSection } from "@/components/misc/LegalSection";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Política de privacidad de demostración de BUCLE.",
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <SectionHeading as="h1" eyebrow="Legal" title="Privacidad" className="mb-8" />
      <div className="flex flex-col gap-8">
        <LegalDisclaimer />
        <LegalSection title="1. Datos que no recogemos">
          <p>
            Los formularios de esta web (newsletter, contacto, pedido) son de
            demostración: ningún dato introducido se envía a un servidor ni
            se almacena fuera de tu propio navegador.
          </p>
        </LegalSection>
        <LegalSection title="2. Almacenamiento local">
          <p>
            El carrito de la compra y las preferencias de cookies se guardan
            en el <code>localStorage</code> de tu navegador para que la
            demo funcione correctamente entre visitas. Puedes borrarlos en
            cualquier momento desde los ajustes de tu navegador.
          </p>
        </LegalSection>
        <LegalSection title="3. Contacto">
          <p>
            Para cualquier consulta sobre este proyecto conceptual, escribe a{" "}
            {siteConfig.legal.correoLegal}.
          </p>
        </LegalSection>
      </div>
    </div>
  );
}
