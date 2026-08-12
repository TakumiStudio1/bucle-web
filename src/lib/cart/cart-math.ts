import type { CartItem, CartTotals } from "@/types/cart";
import type { FulfillmentMethod } from "@/types/order";
import { orderConfig } from "@/config/order";

export function generateLineId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `line-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function lineTotal(item: CartItem): number {
  const extrasTotal = item.extras.reduce(
    (sum, extra) => sum + extra.price * extra.quantity,
    0,
  );
  return (item.unitPrice + extrasTotal) * item.quantity;
}

export function computeTotals(
  items: CartItem[],
  fulfillment: FulfillmentMethod,
): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + lineTotal(item), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryFee =
    fulfillment === "delivery" && subtotal > 0 && subtotal < orderConfig.deliveryMinimum
      ? orderConfig.deliveryFee
      : fulfillment === "delivery" && subtotal > 0
        ? orderConfig.deliveryFee
        : 0;
  const total = subtotal + deliveryFee;

  return {
    subtotal: round(subtotal),
    deliveryFee: round(deliveryFee),
    total: round(total),
    itemCount,
  };
}

export function round(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
