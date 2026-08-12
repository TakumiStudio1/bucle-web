"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, CartTotals } from "@/types/cart";
import type { FulfillmentMethod } from "@/types/order";
import { cartReducer, initialCartState } from "./cart-reducer";
import { computeTotals } from "./cart-math";
import { clearPersistedCart, loadCart, saveCart } from "./cart-storage";

interface CartContextValue {
  items: CartItem[];
  fulfillment: FulfillmentMethod;
  totals: CartTotals;
  itemCount: number;
  hydrated: boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: Omit<CartItem, "lineId">) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  updateNotes: (lineId: string, notes: string) => void;
  setFulfillment: (fulfillment: FulfillmentMethod) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const persisted = loadCart();
    dispatch({
      type: "HYDRATE",
      items: persisted?.items ?? [],
      fulfillment: persisted?.fulfillment ?? "recogida",
    });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    saveCart({ items: state.items, fulfillment: state.fulfillment });
  }, [state.items, state.fulfillment, state.hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "lineId">) => {
    dispatch({ type: "ADD_ITEM", item });
    setDrawerOpen(true);
  }, []);

  const removeItem = useCallback((lineId: string) => {
    dispatch({ type: "REMOVE_ITEM", lineId });
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", lineId, quantity });
  }, []);

  const updateNotes = useCallback((lineId: string, notes: string) => {
    dispatch({ type: "UPDATE_NOTES", lineId, notes });
  }, []);

  const setFulfillment = useCallback((fulfillment: FulfillmentMethod) => {
    dispatch({ type: "SET_FULFILLMENT", fulfillment });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
    clearPersistedCart();
  }, []);

  const totals = useMemo(
    () => computeTotals(state.items, state.fulfillment),
    [state.items, state.fulfillment],
  );

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items],
  );

  const value: CartContextValue = {
    items: state.items,
    fulfillment: state.fulfillment,
    totals,
    itemCount,
    hydrated: state.hydrated,
    isDrawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    addItem,
    removeItem,
    updateQuantity,
    updateNotes,
    setFulfillment,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}
