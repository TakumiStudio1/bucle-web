import type { CartItem } from "@/types/cart";
import type { FulfillmentMethod } from "@/types/order";
import { generateLineId } from "./cart-math";

export interface CartState {
  items: CartItem[];
  fulfillment: FulfillmentMethod;
  hydrated: boolean;
}

export type CartAction =
  | { type: "HYDRATE"; items: CartItem[]; fulfillment: FulfillmentMethod }
  | { type: "ADD_ITEM"; item: Omit<CartItem, "lineId"> }
  | { type: "REMOVE_ITEM"; lineId: string }
  | { type: "UPDATE_QUANTITY"; lineId: string; quantity: number }
  | { type: "UPDATE_NOTES"; lineId: string; notes: string }
  | { type: "SET_FULFILLMENT"; fulfillment: FulfillmentMethod }
  | { type: "CLEAR" };

export const initialCartState: CartState = {
  items: [],
  fulfillment: "recogida",
  hydrated: false,
};

function lineSignature(item: Omit<CartItem, "lineId">): string {
  const extras = [...item.extras]
    .map((e) => `${e.id}:${e.quantity}`)
    .sort()
    .join(",");
  return `${item.productId}|${item.configLabel ?? ""}|${extras}|${item.notes.trim()}`;
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return {
        items: action.items,
        fulfillment: action.fulfillment,
        hydrated: true,
      };

    case "ADD_ITEM": {
      const signature = lineSignature(action.item);
      const existingIndex = state.items.findIndex(
        (existing) => lineSignature(existing) === signature,
      );
      if (existingIndex >= 0) {
        const items = [...state.items];
        items[existingIndex] = {
          ...items[existingIndex],
          quantity: items[existingIndex].quantity + action.item.quantity,
        };
        return { ...state, items };
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, lineId: generateLineId() }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.lineId !== action.lineId),
      };

    case "UPDATE_QUANTITY": {
      const quantity = Math.max(1, Math.min(20, action.quantity));
      return {
        ...state,
        items: state.items.map((item) =>
          item.lineId === action.lineId ? { ...item, quantity } : item,
        ),
      };
    }

    case "UPDATE_NOTES":
      return {
        ...state,
        items: state.items.map((item) =>
          item.lineId === action.lineId
            ? { ...item, notes: action.notes }
            : item,
        ),
      };

    case "SET_FULFILLMENT":
      return { ...state, fulfillment: action.fulfillment };

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
}
