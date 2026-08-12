"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart/cart-context";

interface CartButtonProps {
  tone?: "dark" | "light";
}

export function CartButton({ tone = "dark" }: CartButtonProps) {
  const { itemCount, openDrawer } = useCart();
  const color = tone === "dark" ? "text-cocoa hover:bg-grape/10" : "text-cream hover:bg-white/10";

  return (
    <button
      type="button"
      onClick={openDrawer}
      className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors ${color}`}
      aria-label={`Ver pedido, ${itemCount} ${itemCount === 1 ? "artículo" : "artículos"}`}
    >
      <ShoppingBag className="h-5 w-5" aria-hidden="true" />
      {itemCount > 0 ? (
        <span
          className="absolute top-0.5 right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-strawberry px-1 text-[0.65rem] font-bold text-cream"
          aria-hidden="true"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </button>
  );
}
