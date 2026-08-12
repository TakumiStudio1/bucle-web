import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Habla con BUCLE — formulario de contacto de demostración.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <SectionHeading
        as="h1"
        eyebrow="Hablemos"
        title="Contacto"
        className="mb-10"
      />
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <ContactForm />
        <aside className="flex flex-col gap-4 text-sm text-cocoa/70">
          <div>
            <p className="text-xs font-bold tracking-widest text-cocoa/50 uppercase">
              Teléfono
            </p>
            <p>{siteConfig.contact.phone}</p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-cocoa/50 uppercase">
              Email
            </p>
            <p>{siteConfig.contact.email}</p>
          </div>
          <p className="mt-4 rounded-2xl bg-cocoa/5 px-4 py-3 text-xs">
            Este formulario forma parte de un proyecto conceptual y no envía
            mensajes a ningún servidor.
          </p>
        </aside>
      </div>
    </div>
  );
}
