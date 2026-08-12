import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Cero } from "@/components/brand/Cero";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "La historia, la filosofía y la mascota detrás de BUCLE — proyecto conceptual de Takumi Studio.",
};

const VALUES = [
  "Producto que apetece.",
  "Identidad que se recuerda.",
  "Experiencias para compartir.",
  "Sencillez con carácter.",
  "Sistema preparado para crecer.",
];

export default function NosotrosPage() {
  return (
    <div className="pt-24">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Sobre Bucle"
          title="Todo empieza con una vuelta."
          align="center"
          className="mx-auto"
        />
      </section>

      <section className="relative overflow-hidden bg-cocoa py-20 text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] order-2 lg:order-1">
            <Image
              src="/images/hero-poster.jpg"
              alt="Cartel BUCLE: uno lleva a otro, con el bucle lima y CERO"
              fill
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 flex flex-col gap-5 lg:order-2">
            <h2 className="font-display text-3xl uppercase sm:text-4xl">
              La historia
            </h2>
            <p className="text-cream/80">
              BUCLE nace de una idea sencilla: cuando algo está muy bueno,
              repetir no es una opción; es parte del ritual. La marca
              convierte ese impulso en un sistema visual construido con
              círculos, órbitas y mensajes que siempre invitan a volver.
            </p>
            <h2 className="font-display mt-4 text-3xl uppercase sm:text-4xl">
              La filosofía
            </h2>
            <p className="text-cream/80">
              Hacemos donuts para disfrutarlos, compartirlos y volver a
              elegir. Sin solemnidad, sin vitrinas intocables y sin perder de
              vista el producto.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-4xl uppercase text-grape sm:text-5xl">
              El centro del bucle.
            </h2>
            <p className="text-cocoa/75">
              CERO vive en el centro del bucle. No habla. Mira, aparece y
              desaparece. Su expresión cambia, pero su forma siempre vuelve
              al mismo punto: un vacío oscuro con dos ojos color crema. Sin
              boca, sin brazos, sin piernas — nunca los tendrá.
            </p>
          </div>
          <div className="flex justify-center gap-6">
            <Cero pose="normal" className="h-32 w-32" blink />
            <Cero pose="wink" className="h-32 w-32" />
            <Cero pose="sleepy" className="h-32 w-32" />
          </div>
        </div>
      </section>

      <section className="bg-lime/20 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl uppercase text-grape sm:text-4xl">
            Lo que no cambia
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {VALUES.map((value) => (
              <li
                key={value}
                className="rounded-2xl border-2 border-cocoa/10 bg-cream px-5 py-4 text-cocoa"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-display mb-8 text-3xl uppercase text-grape sm:text-4xl">
          Universo de marca
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            "/images/boxes-flatlay.jpg",
            "/images/storefront.jpg",
            "/images/uniforms.jpg",
            "/images/delivery-scooter.jpg",
            "/images/street-campaign.jpg",
            "/images/menu-tri-fold.jpg",
            "/images/interior.jpg",
            "/images/social-grid.jpg",
          ].map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src={src} alt="" fill sizes="25vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-grape py-20 text-center text-cream">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl uppercase sm:text-5xl">
            Preparada para seguir girando.
          </h2>
          <p className="text-cream/80">
            El sistema BUCLE está pensado para crecer: nuevos sabores, nuevas
            tiendas y nuevos formatos sin perder la identidad que lo hace
            reconocible en pocos segundos.
          </p>
          <Button href="/carta" size="lg">
            Ver la carta
          </Button>
        </div>
      </section>
    </div>
  );
}
