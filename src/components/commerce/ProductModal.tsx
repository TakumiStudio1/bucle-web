"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import type { MenuItem } from "@/types/menu";
import { extras as allExtras } from "@/data/products";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice } from "@/lib/cart/cart-math";
import { ProductTagBadge } from "./ProductTagBadge";

interface ProductModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ item, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const availableExtras = allExtras.filter((extra) =>
    item.extraIds?.includes(extra.id),
  );

  // Resetting quantity/extras when the dialog opens is a one-time sync tied
  // to the isOpen transition, not derived render state.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isOpen) return;
    setQuantity(1);
    setSelectedExtras(new Set());
    /* eslint-enable react-hooks/set-state-in-effect */
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function toggleExtra(id: string) {
    setSelectedExtras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const extrasTotal = availableExtras
    .filter((extra) => selectedExtras.has(extra.id))
    .reduce((sum, extra) => sum + extra.price, 0);
  const totalPrice = (item.price + extrasTotal) * quantity;

  function handleAdd() {
    addItem({
      kind: "product",
      productId: item.id,
      name: item.name,
      image: item.image,
      unitPrice: item.price,
      quantity,
      extras: availableExtras
        .filter((extra) => selectedExtras.has(extra.id))
        .map((extra) => ({
          id: extra.id,
          label: extra.label,
          price: extra.price,
          quantity: 1,
        })),
      notes: "",
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-cocoa/60" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-t-3xl bg-cream sm:rounded-3xl"
      >
        <div className="relative aspect-[4/3] w-full shrink-0 bg-grape/5">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(min-width: 640px) 32rem, 100vw"
              className="object-cover"
            />
          ) : null}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-cocoa hover:bg-cream"
            aria-label="Cerrar detalle del producto"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <ProductTagBadge key={tag} tag={tag} />
            ))}
          </div>
          <h2
            id="product-modal-title"
            className="font-display text-3xl uppercase text-grape"
          >
            {item.name}
          </h2>
          <p className="text-cocoa/75">{item.description}</p>

          {item.allergens.length > 0 ? (
            <p className="text-xs text-cocoa/60">
              <strong>Alérgenos:</strong> {item.allergens.join(", ")}
            </p>
          ) : null}

          {availableExtras.length > 0 ? (
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-1 text-xs font-bold tracking-wide text-cocoa/60 uppercase">
                Extras
              </legend>
              {availableExtras.map((extra) => (
                <label
                  key={extra.id}
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-cocoa/15 px-3 py-2 text-sm has-checked:border-grape has-checked:bg-grape/5"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedExtras.has(extra.id)}
                      onChange={() => toggleExtra(extra.id)}
                      className="h-4 w-4"
                    />
                    {extra.label}
                  </span>
                  <span className="text-cocoa/60">
                    +{formatPrice(extra.price)}
                  </span>
                </label>
              ))}
            </fieldset>
          ) : null}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3 rounded-full border border-cocoa/20 px-2 py-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cocoa/5"
                aria-label="Reducir cantidad"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="min-w-5 text-center font-semibold" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cocoa/5"
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="font-display rounded-full bg-lime px-6 py-3 text-sm font-bold tracking-wide text-cocoa uppercase hover:bg-lime-soft"
            >
              Añadir al bucle — {formatPrice(totalPrice)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
