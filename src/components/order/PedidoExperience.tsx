"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { DemoOrderConfirmation, FulfillmentMethod, OrderAddress, OrderContact } from "@/types/order";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice, lineTotal } from "@/lib/cart/cart-math";
import { locations } from "@/data/locations";
import { orderConfig } from "@/config/order";
import { submitDemoOrder } from "@/lib/checkout";
import { OrderForm } from "./OrderForm";
import { OrderConfirmation } from "./OrderConfirmation";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export function PedidoExperience() {
  const searchParams = useSearchParams();
  const { items, totals, fulfillment, setFulfillment, clearCart, updateQuantity, removeItem } = useCart();
  const [locationId, setLocationId] = useState(
    searchParams.get("local") ?? locations[0].id,
  );
  const [pickupWindow, setPickupWindow] = useState<string>(orderConfig.pickupWindows[0]);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<DemoOrderConfirmation | null>(null);

  async function handleSubmit(contact: OrderContact, address?: OrderAddress) {
    setSubmitting(true);
    try {
      const result = await submitDemoOrder({
        items,
        totals,
        fulfillment,
        locationId: fulfillment === "recogida" ? locationId : undefined,
        pickupWindow: fulfillment === "recogida" ? pickupWindow : undefined,
        address,
        contact,
      });
      setConfirmation(result);
      clearCart();
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return <OrderConfirmation confirmation={confirmation} />;
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Todavía no has entrado."
        description="Tu pedido está vacío. Añade algo desde la carta para cerrar el círculo."
        action={<Button href="/carta">Ir a la carta</Button>}
      />
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <OrderForm
        fulfillment={fulfillment}
        onFulfillmentChange={(value: FulfillmentMethod) => setFulfillment(value)}
        locationId={locationId}
        onLocationChange={setLocationId}
        pickupWindow={pickupWindow}
        onPickupWindowChange={setPickupWindow}
        onSubmit={handleSubmit}
        submitting={submitting}
      />

      <div className="h-fit rounded-3xl border-2 border-cocoa/10 bg-cream p-6">
        <h2 className="font-display mb-4 text-xl uppercase text-grape">
          Tu pedido
        </h2>
        <ul className="flex flex-col divide-y divide-cocoa/10">
          {items.map((item) => (
            <li key={item.lineId} className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-semibold text-cocoa">{item.name}</p>
                {item.configLabel ? (
                  <p className="text-xs text-cocoa/60">{item.configLabel}</p>
                ) : null}
                <div className="mt-1 flex items-center gap-2 text-xs text-cocoa/60">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                    className="rounded-full border border-cocoa/20 px-2"
                    aria-label={`Reducir cantidad de ${item.name}`}
                  >
                    −
                  </button>
                  <span aria-live="polite">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                    className="rounded-full border border-cocoa/20 px-2"
                    aria-label={`Aumentar cantidad de ${item.name}`}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.lineId)}
                    className="ml-2 text-strawberry underline"
                  >
                    Quitar
                  </button>
                </div>
              </div>
              <span className="font-display text-sm text-grape">
                {formatPrice(lineTotal(item))}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-4 flex flex-col gap-2 border-t border-cocoa/10 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-cocoa/70">Subtotal</dt>
            <dd>{formatPrice(totals.subtotal)}</dd>
          </div>
          {totals.deliveryFee > 0 ? (
            <div className="flex justify-between">
              <dt className="text-cocoa/70">Envío</dt>
              <dd>{formatPrice(totals.deliveryFee)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between border-t border-cocoa/10 pt-2 font-display text-lg uppercase">
            <dt>Total</dt>
            <dd>{formatPrice(totals.total)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
