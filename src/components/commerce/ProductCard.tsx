"use client";

import Image from "next/image";
import { useState } from "react";
import type { MenuItem } from "@/types/menu";
import { formatPrice } from "@/lib/cart/cart-math";
import { useCart } from "@/lib/cart/cart-context";
import { ProductTagBadge } from "./ProductTagBadge";
import { ProductModal } from "./ProductModal";

export function ProductCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const hasExtras = (item.extraIds?.length ?? 0) > 0;

  function quickAdd() {
    if (hasExtras) {
      setModalOpen(true);
      return;
    }
    addItem({
      kind: "product",
      productId: item.id,
      name: item.name,
      image: item.image,
      unitPrice: item.price,
      quantity: 1,
      extras: [],
      notes: "",
    });
  }

  return (
    <>
      <div className="group flex flex-col overflow-hidden rounded-3xl border-2 border-cocoa/10 bg-cream transition-all hover:-translate-y-1 hover:border-cocoa/30 hover:shadow-lg">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="relative aspect-square w-full overflow-hidden bg-grape/5"
          aria-label={`Ver detalle de ${item.name}`}
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
        </button>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 2).map((tag) => (
              <ProductTagBadge key={tag} tag={tag} />
            ))}
          </div>
          <h3 className="font-display text-xl uppercase text-cocoa">{item.name}</h3>
          <p className="line-clamp-2 flex-1 text-sm text-cocoa/70">
            {item.description}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-display text-lg text-grape">
              {formatPrice(item.price)}
            </span>
            <button
              type="button"
              onClick={quickAdd}
              className="font-display rounded-full bg-lime px-4 py-2 text-xs font-bold tracking-wide text-cocoa uppercase transition-colors hover:bg-lime-soft"
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
      <ProductModal
        item={item}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
