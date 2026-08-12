import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

const TILES = [
  { image: "/images/boxes-flatlay.jpg", label: "Packaging" },
  { image: "/images/storefront.jpg", label: "Fachada" },
  { image: "/images/interior.jpg", label: "Interior" },
  { image: "/images/uniforms.jpg", label: "Uniformes" },
  { image: "/images/social-grid.jpg", label: "Redes sociales" },
  { image: "/images/delivery-scooter.jpg", label: "Delivery" },
];

export function BrandMosaic() {
  return (
    <section className="bg-grape py-20 text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Más allá del donut"
          title="Una marca que sigue girando."
          tone="light"
        />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TILES.map((tile) => (
            <div
              key={tile.label}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={tile.image}
                alt={tile.label}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-cocoa/70 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="font-display text-sm uppercase text-cream">
                  {tile.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
