import Image from "next/image";

export function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-cocoa py-24 text-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-4xl uppercase sm:text-5xl lg:text-6xl">
            Repetir está en nuestra naturaleza.
          </h2>
          <p className="max-w-lg text-lg text-cream/80">
            No hacemos donuts para mirarlos desde lejos. Los hacemos para
            elegir uno, volver a por otro y cerrar el círculo con café.
          </p>
          <p className="font-display text-2xl text-lime uppercase">
            Gira. Muerde. Repite.
          </p>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem]">
          <Image
            src="/images/manifesto.jpg"
            alt="Donut BUCLE con glaseado morado, pistacho y frambuesa, con los ojos de CERO asomando por el agujero"
            fill
            sizes="(min-width: 1024px) 50vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
