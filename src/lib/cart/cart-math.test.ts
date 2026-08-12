import { describe, expect, it } from "vitest";
import { computeTotals, lineTotal } from "./cart-math";
import type { CartItem } from "@/types/cart";

function makeItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    lineId: "line-1",
    kind: "product",
    productId: "donut-1",
    name: "La Vuelta Original",
    unitPrice: 3.2,
    quantity: 1,
    extras: [],
    notes: "",
    ...overrides,
  };
}

describe("lineTotal", () => {
  it("multiplies unit price by quantity", () => {
    expect(lineTotal(makeItem({ quantity: 3 }))).toBeCloseTo(9.6);
  });

  it("adds extras multiplied by their own quantity", () => {
    const item = makeItem({
      quantity: 2,
      extras: [{ id: "topping", label: "Topping", price: 0.6, quantity: 1 }],
    });
    expect(lineTotal(item)).toBeCloseTo((3.2 + 0.6) * 2);
  });
});

describe("computeTotals", () => {
  it("returns zero totals for an empty cart", () => {
    const totals = computeTotals([], "recogida");
    expect(totals).toEqual({ subtotal: 0, deliveryFee: 0, total: 0, itemCount: 0 });
  });

  it("does not charge delivery fee for pickup orders", () => {
    const totals = computeTotals([makeItem()], "recogida");
    expect(totals.deliveryFee).toBe(0);
    expect(totals.total).toBeCloseTo(3.2);
  });

  it("charges delivery fee for non-empty delivery orders", () => {
    const totals = computeTotals([makeItem({ quantity: 4 })], "delivery");
    expect(totals.deliveryFee).toBeGreaterThan(0);
    expect(totals.total).toBeCloseTo(totals.subtotal + totals.deliveryFee);
  });

  it("counts total items across lines", () => {
    const totals = computeTotals(
      [makeItem({ quantity: 2 }), makeItem({ lineId: "line-2", quantity: 3 })],
      "recogida",
    );
    expect(totals.itemCount).toBe(5);
  });
});
