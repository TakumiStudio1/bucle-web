import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LegalDisclaimer, LegalSection } from "@/components/misc/LegalSection";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal de demostración de BUCLE.",
};

export default function AvisoLegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <SectionHeading as="h1" eyebrow="Legal" title="Aviso legal" className="mb-8" />
      <div className="flex flex-col gap-8">
        <LegalDisclaimer />
        <LegalSection title="1. Identificación">
          <p>
            En cumplimiento del deber de información, se indican los
            siguientes datos, todos ellos ficticios:
          </p>
          <ul className="list-disc pl-5">
            <li>Razón social: {siteConfig.legal.razonSocial}</li>
            <li>CIF: {siteConfig.legal.cif}</li>
            <li>Domicilio: {siteConfig.legal.domicilio}</li>
            <li>Correo: {siteConfig.legal.correoLegal}</li>
            <li>Registro: {siteConfig.legal.registro}</li>
          </ul>
        </LegalSection>
        <LegalSection title="2. Objeto">
          <p>
            Este sitio web es un proyecto conceptual desarrollado por Takumi
            Studio con fines de portfolio. No representa un negocio real ni
            ofrece productos o servicios reales.
          </p>
        </LegalSection>
        <LegalSection title="3. Propiedad intelectual">
          <p>
            Los contenidos, diseños y marca BUCLE son propiedad de Takumi
            Studio y se muestran únicamente con fines demostrativos.
          </p>
        </LegalSection>
        <LegalSection title="4. Condiciones de uso">
          <p>
            El acceso a este sitio no implica relación comercial alguna. No
            se procesan pagos ni pedidos reales a través de esta web.
          </p>
        </LegalSection>
      </div>
    </div>
  );
}
