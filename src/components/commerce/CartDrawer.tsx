"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useCart } from "@/lib/cart/cart-context";
import { CartLineItem } from "./CartLineItem";
import { OrderSummary } from "./OrderSummary";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export function CartDrawer() {
  const { items, totals, isDrawerOpen, closeDrawer } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isDrawerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeDrawer();
      if (event.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          "a, button, input, [tabindex]:not([tabindex='-1'])",
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawerOpen, closeDrawer]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isDrawerOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isDrawerOpen}
    >
      <div
        className={`absolute inset-0 bg-cocoa/50 transition-opacity ${isDrawerOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeDrawer}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Tu pedido"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b-2 border-cocoa/10 px-5 py-4">
          <h2 className="font-display text-xl uppercase text-grape">Tu pedido</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeDrawer}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-cocoa/5"
            aria-label="Cerrar pedido"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5" aria-live="polite">
          {items.length === 0 ? (
            <EmptyState
              title="Todavía no has entrado."
              description="Añade un donut, un café o monta tu propia caja para empezar el bucle."
            />
          ) : (
            <ul>
              {items.map((item) => (
                <CartLineItem key={item.lineId} item={item} />
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <div className="flex flex-col gap-4 border-t-2 border-cocoa/10 px-5 py-5">
            <OrderSummary totals={totals} />
            <Button href="/pedido" onClick={closeDrawer} className="w-full">
              Ver mi pedido
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
