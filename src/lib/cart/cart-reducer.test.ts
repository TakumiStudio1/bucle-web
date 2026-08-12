import { describe, expect, it } from "vitest";
import { cartReducer, initialCartState } from "./cart-reducer";
import type { CartItem } from "@/types/cart";

function baseItem(overrides: Partial<Omit<CartItem, "lineId">> = {}) {
  return {
    kind: "product" as const,
    productId: "donut-1",
    name: "La Vuelta Original",
    unitPrice: 3.2,
    quantity: 1,
    extras: [],
    notes: "",
    ...overrides,
  };
}

describe("cartReducer", () => {
  it("adds a new line item", () => {
    const state = cartReducer(initialCartState, { type: "ADD_ITEM", item: baseItem() });
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it("merges identical items instead of duplicating lines", () => {
    let state = cartReducer(initialCartState, { type: "ADD_ITEM", item: baseItem() });
    state = cartReducer(state, { type: "ADD_ITEM", item: baseItem({ quantity: 2 }) });
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
  });

  it("keeps distinct lines for different configurations", () => {
    let state = cartReducer(initialCartState, {
      type: "ADD_ITEM",
      item: baseItem({ configLabel: "Cacao" }),
    });
    state = cartReducer(state, {
      type: "ADD_ITEM",
      item: baseItem({ configLabel: "Vegana" }),
    });
    expect(state.items).toHaveLength(2);
  });

  it("clamps quantity updates between 1 and 20", () => {
    let state = cartReducer(initialCartState, { type: "ADD_ITEM", item: baseItem() });
    const lineId = state.items[0].lineId;
    state = cartReducer(state, { type: "UPDATE_QUANTITY", lineId, quantity: 0 });
    expect(state.items[0].quantity).toBe(1);
    state = cartReducer(state, { type: "UPDATE_QUANTITY", lineId, quantity: 99 });
    expect(state.items[0].quantity).toBe(20);
  });

  it("removes a line item", () => {
    let state = cartReducer(initialCartState, { type: "ADD_ITEM", item: baseItem() });
    const lineId = state.items[0].lineId;
    state = cartReducer(state, { type: "REMOVE_ITEM", lineId });
    expect(state.items).toHaveLength(0);
  });

  it("clears all items", () => {
    let state = cartReducer(initialCartState, { type: "ADD_ITEM", item: baseItem() });
    state = cartReducer(state, { type: "CLEAR" });
    expect(state.items).toHaveLength(0);
  });
});
