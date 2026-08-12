import type { DemoOrderConfirmation } from "@/types/order";
import { Cero } from "@/components/brand/Cero";
import { Button } from "@/components/ui/Button";

export function OrderConfirmation({
  confirmation,
}: {
  confirmation: DemoOrderConfirmation;
}) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-6 py-12 text-center">
      <Cero pose="mischief" className="h-24 w-24" bodyColor="var(--color-grape)" />
      <h1 className="font-display text-4xl uppercase text-grape">
        Pedido cerrado.
      </h1>
      <p className="text-cocoa/75">
        Este es un pedido de demostración: no se ha realizado ningún cobro ni
        se ha enviado información a ningún servidor.
      </p>
      <div className="rounded-2xl border-2 border-cocoa/15 bg-cream px-6 py-4">
        <p className="text-xs font-bold tracking-widest text-cocoa/50 uppercase">
          Número de pedido
        </p>
        <p className="font-display text-2xl text-grape">
          {confirmation.orderNumber}
        </p>
        <p className="mt-1 text-xs text-cocoa/50">
          {confirmation.fulfillment === "recogida"
            ? "Para recoger en tienda"
            : "Para delivery"}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/carta">Volver a la carta</Button>
        <Button href="/" variant="dark">
          Ir al inicio
        </Button>
      </div>
    </div>
  );
}
