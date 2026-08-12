import { SectionHeading } from "@/components/ui/SectionHeading";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function NewsletterSection() {
  return (
    <section className="bg-cocoa py-20 text-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Club Bucle"
          title="Vuelve antes que nadie."
          description="Nuevos sabores, ediciones limitadas y excusas para repetir."
          tone="light"
        />
        <NewsletterForm />
      </div>
    </section>
  );
}
