"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import type { CartItem } from "@/types/cart";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice, lineTotal } from "@/lib/cart/cart-math";

export function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <li className="flex gap-3 border-b border-cocoa/10 py-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream">
        {item.image ? (
          <Image
            src={item.image}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-display text-sm leading-tight uppercase text-cocoa">
            {item.name}
          </p>
          <button
            type="button"
            onClick={() => removeItem(item.lineId)}
            className="rounded-full p-1 text-cocoa/50 hover:bg-cocoa/5 hover:text-strawberry"
            aria-label={`Quitar ${item.name} del pedido`}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        {item.configLabel ? (
          <p className="text-xs text-cocoa/60">{item.configLabel}</p>
        ) : null}
        {item.extras.length > 0 ? (
          <p className="text-xs text-cocoa/60">
            {item.extras.map((extra) => extra.label).join(", ")}
          </p>
        ) : null}
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full border border-cocoa/15 px-1">
            <button
              type="button"
              onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="flex h-7 w-7 items-center justify-center rounded-full text-cocoa disabled:opacity-30"
              aria-label="Reducir cantidad"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <span className="min-w-4 text-center text-sm font-semibold" aria-live="polite">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-cocoa"
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <span className="font-display text-sm text-grape">
            {formatPrice(lineTotal(item))}
          </span>
        </div>
      </div>
    </li>
  );
}
