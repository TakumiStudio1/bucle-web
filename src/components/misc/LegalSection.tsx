interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-2xl uppercase text-grape">{title}</h2>
      <div className="flex flex-col gap-3 text-sm text-cocoa/75">{children}</div>
    </section>
  );
}

export function LegalDisclaimer() {
  return (
    <p className="rounded-2xl border-2 border-strawberry/30 bg-strawberry/5 px-5 py-4 text-sm text-cocoa/80">
      BUCLE es una marca ficticia creada con fines de portfolio por Takumi
      Studio. Este texto es un modelo de demostración, no constituye
      asesoramiento jurídico y debe revisarlo un profesional antes de
      cualquier uso comercial real.
    </p>
  );
}
