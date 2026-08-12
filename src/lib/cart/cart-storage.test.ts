import { beforeEach, describe, expect, it } from "vitest";
import { clearPersistedCart, loadCart, saveCart } from "./cart-storage";
import type { CartItem } from "@/types/cart";

const item: CartItem = {
  lineId: "line-1",
  kind: "product",
  productId: "donut-1",
  name: "La Vuelta Original",
  unitPrice: 3.2,
  quantity: 1,
  extras: [],
  notes: "",
};

describe("cart-storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns null when nothing is persisted", () => {
    expect(loadCart()).toBeNull();
  });

  it("round-trips items and fulfillment through localStorage", () => {
    saveCart({ items: [item], fulfillment: "delivery" });
    const loaded = loadCart();
    expect(loaded?.items).toHaveLength(1);
    expect(loaded?.fulfillment).toBe("delivery");
  });

  it("recovers safely from corrupted storage", () => {
    window.localStorage.setItem("bucle-cart-v1", "{not valid json");
    expect(loadCart()).toBeNull();
  });

  it("clears persisted cart", () => {
    saveCart({ items: [item], fulfillment: "recogida" });
    clearPersistedCart();
    expect(loadCart()).toBeNull();
  });
});
