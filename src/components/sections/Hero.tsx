import { Button } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { HeroDonutReveal } from "@/components/brand/HeroDonutReveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grape pt-28 pb-16 text-cream sm:pt-32 lg:pt-40 lg:pb-24">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full border-2 border-strawberry/40 sm:h-96 sm:w-96" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-sans text-xs font-bold tracking-[0.3em] text-lime uppercase">
              Donuts + Coffee
            </span>
            <DemoBadge className="border-cream/40 bg-transparent text-cream/80">
              Proyecto conceptual
            </DemoBadge>
          </div>

          <h1 className="font-display text-6xl leading-[0.92] text-cream uppercase sm:text-7xl lg:text-8xl">
            Entra en el
            <br />
            bucle.
          </h1>

          <p className="max-w-md text-lg text-cream/85">
            Donuts recién hechos, café sin rodeos y una regla muy simple: uno
            lleva a otro.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button href="/carta" size="lg">
              Ver la carta
            </Button>
            <Button href="/pedido" size="lg" variant="ghost">
              Pedir ahora
            </Button>
          </div>

          <div className="flex items-center gap-2 pt-4 text-sm text-cream/70">
            <span className="h-2 w-2 rounded-full bg-lime" aria-hidden="true" />
            Abierto hoy
          </div>
        </div>

        <div className="relative mx-auto flex aspect-square w-full max-w-lg items-center justify-center lg:max-w-none">
          <HeroDonutReveal
            className="max-w-md"
          />
          <span className="sr-only">
            Animación de bienvenida: un donut de color lima se abre y CERO,
            la mascota de BUCLE, asoma desde el centro.
          </span>
        </div>
      </div>
    </section>
  );
}
