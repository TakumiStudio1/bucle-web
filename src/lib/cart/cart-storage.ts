import type { CartItem } from "@/types/cart";
import type { FulfillmentMethod } from "@/types/order";

const STORAGE_KEY = "bucle-cart-v1";

interface PersistedCart {
  items: CartItem[];
  fulfillment: FulfillmentMethod;
}

export function loadCart(): PersistedCart | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedCart;
    if (!Array.isArray(parsed.items)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveCart(cart: PersistedCart): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Storage can fail (private mode, quota). The cart still works in memory.
  }
}

export function clearPersistedCart(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
