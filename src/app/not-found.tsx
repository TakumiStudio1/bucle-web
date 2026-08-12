import type { Metadata } from "next";
import { Cero } from "@/components/brand/Cero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <Cero pose="sleepy" className="h-28 w-28" bodyColor="var(--color-grape)" blink />
      <p className="font-display text-2xl text-strawberry uppercase">
        Error 404
      </p>
      <h1 className="font-display text-4xl uppercase text-grape sm:text-5xl">
        Te has salido del bucle.
      </h1>
      <p className="max-w-md text-cocoa/70">
        Esta página no existe, pero el círculo siempre se puede cerrar.
        Vuelve al inicio y empieza otra vuelta.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/">Volver al inicio</Button>
        <Button href="/carta" variant="dark">
          Ver la carta
        </Button>
      </div>
    </div>
  );
}
