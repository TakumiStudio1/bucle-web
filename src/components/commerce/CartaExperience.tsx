"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { donuts, coffee, cold, boxes, extras } from "@/data/products";
import { filterMenu, type QuickFilter } from "@/lib/menu/filter-menu";
import { formatPrice } from "@/lib/cart/cart-math";
import { useCart } from "@/lib/cart/cart-context";
import { SearchBar } from "./SearchBar";
import { MenuFilters } from "./MenuFilters";
import { CategoryTabs } from "./CategoryTabs";
import { AllergenNotice } from "./AllergenNotice";
import { ProductCard } from "./ProductCard";
import { BoxBuilder } from "./BoxBuilder";
import { EmptyState } from "@/components/ui/EmptyState";

export function CartaExperience() {
  const searchParams = useSearchParams();
  const initialFilter = (searchParams.get("filtro") as QuickFilter) || "todo";
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<QuickFilter>(initialFilter);
  const { addItem } = useCart();

  const filteredDonuts = useMemo(
    () => filterMenu(donuts, { query, filter }),
    [query, filter],
  );

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-4">
        <CategoryTabs />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={query} onChange={setQuery} />
          <MenuFilters value={filter} onChange={setFilter} />
        </div>
        <AllergenNotice />
      </div>

      <section id="donuts" className="scroll-mt-32">
        <h2 className="font-display mb-6 text-3xl uppercase text-grape">Donuts</h2>
        {filteredDonuts.length === 0 ? (
          <EmptyState
            title="No hay coincidencias."
            description="Prueba con otra palabra o quita algún filtro."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredDonuts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      <section id="cajas" className="scroll-mt-32">
        <h2 className="font-display mb-6 text-3xl uppercase text-grape">Cajas</h2>
        <p className="mb-6 max-w-xl text-sm text-cocoa/70">
          Bucle x3 desde {formatPrice(boxes[0].basePrice)}, Bucle x6 desde{" "}
          {formatPrice(boxes[1].basePrice)}, Bucle x12 desde{" "}
          {formatPrice(boxes[2].basePrice)}.
        </p>
        <BoxBuilder />
      </section>

      <section id="cafe" className="scroll-mt-32">
        <h2 className="font-display mb-6 text-3xl uppercase text-grape">Café</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coffee.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section id="frios" className="scroll-mt-32">
        <h2 className="font-display mb-6 text-3xl uppercase text-grape">
          Bebidas frías
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cold.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section id="extras" className="scroll-mt-32">
        <h2 className="font-display mb-6 text-3xl uppercase text-grape">Extras</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {extras.map((extra) => (
            <li
              key={extra.id}
              className="flex items-center justify-between rounded-2xl border-2 border-cocoa/10 px-4 py-3"
            >
              <span className="text-sm font-medium text-cocoa">{extra.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-cocoa/60">
                  {formatPrice(extra.price)}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    addItem({
                      kind: "product",
                      productId: extra.id,
                      name: extra.label,
                      unitPrice: extra.price,
                      quantity: 1,
                      extras: [],
                      notes: "",
                    })
                  }
                  className="font-display rounded-full bg-lime px-3 py-1.5 text-xs font-bold text-cocoa uppercase hover:bg-lime-soft"
                >
                  Añadir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
