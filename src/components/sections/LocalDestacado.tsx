import Image from "next/image";
import { locations } from "@/data/locations";
import { Button } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";

export function LocalDestacado() {
  const flagship = locations.find((l) => l.isFlagship) ?? locations[0];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="font-display mb-10 text-4xl uppercase text-cocoa sm:text-5xl">
        Nuestro punto de partida.
      </h2>
      <div className="grid overflow-hidden rounded-[2rem] border-2 border-cocoa/10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <Image
            src={flagship.image}
            alt={flagship.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 bg-cream p-8 sm:p-10">
          <DemoBadge className="w-fit">Ubicación de demostración</DemoBadge>
          <h3 className="font-display text-3xl uppercase text-grape">
            {flagship.name}
          </h3>
          <p className="text-cocoa/70">{flagship.hoursToday}</p>
          <ul className="flex flex-wrap gap-2 text-xs font-bold tracking-wide text-cocoa/60 uppercase">
            {flagship.services.map((service) => (
              <li
                key={service}
                className="rounded-full bg-cocoa/5 px-3 py-1"
              >
                {SERVICE_LABEL[service]}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href="/locales">Ver locales</Button>
            <Button href="/pedido" variant="dark">
              Pedir para recoger
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICE_LABEL: Record<string, string> = {
  recogida: "Recogida",
  delivery: "Delivery",
  terraza: "Terraza",
  qr: "Pedido por QR",
};
