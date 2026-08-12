import type { CartTotals } from "@/types/cart";
import { formatPrice } from "@/lib/cart/cart-math";

export function OrderSummary({ totals }: { totals: CartTotals }) {
  return (
    <dl className="flex flex-col gap-2 text-sm">
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
      <div className="mt-1 flex justify-between border-t border-cocoa/15 pt-2 font-display text-lg uppercase">
        <dt>Total</dt>
        <dd>{formatPrice(totals.total)}</dd>
      </div>
    </dl>
  );
}
