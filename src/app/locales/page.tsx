import type { Metadata } from "next";
import { locations } from "@/data/locations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LocationCard } from "@/components/locations/LocationCard";

export const metadata: Metadata = {
  title: "Locales",
  description: "Los locales de demostración de BUCLE en Sevilla, Málaga y Madrid.",
};

export default function LocalesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <SectionHeading
        as="h1"
        eyebrow="Dónde encontrarnos"
        title="Locales"
        description="Tres puntos de partida ficticios, pensados para que el bucle esté siempre cerca."
        className="mb-12"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </div>
  );
}
