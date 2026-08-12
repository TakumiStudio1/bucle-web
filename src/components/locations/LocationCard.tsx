import Image from "next/image";
import type { Location } from "@/types/location";
import { Button } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";

const SERVICE_LABEL: Record<string, string> = {
  recogida: "Recogida",
  delivery: "Delivery",
  terraza: "Terraza",
  qr: "Pedido por QR",
};

export function LocationCard({ location }: { location: Location }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border-2 border-cocoa/10 bg-cream">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={location.image}
          alt={location.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <DemoBadge className="w-fit">Ubicación de demostración</DemoBadge>
        <h2 className="font-display text-2xl uppercase text-grape">
          {location.name}
        </h2>
        <p className="text-sm text-cocoa/70">{location.address}</p>
        <p className="text-sm font-semibold text-cocoa">{location.hoursToday}</p>

        <ul className="flex flex-col gap-1 text-xs text-cocoa/60">
          {location.hours.map((entry) => (
            <li key={entry.day} className="flex justify-between">
              <span>{entry.day}</span>
              <span>{entry.time}</span>
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap gap-2 pt-1 text-xs font-bold tracking-wide text-cocoa/60 uppercase">
          {location.services.map((service) => (
            <li key={service} className="rounded-full bg-cocoa/5 px-3 py-1">
              {SERVICE_LABEL[service]}
            </li>
          ))}
        </ul>

        <p className="text-xs text-cocoa/50">{location.phone}</p>

        <Button href={`/pedido?local=${location.id}`} className="mt-2 w-full">
          Pedir para recoger
        </Button>
      </div>
    </article>
  );
}
