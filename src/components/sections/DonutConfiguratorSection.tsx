"use client";

import { useMemo, useState } from "react";
import {
  configuratorBasePrice,
  configuratorBases,
  configuratorGlazes,
  configuratorToppings,
} from "@/data/products";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice, round } from "@/lib/cart/cart-math";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DonutPreview } from "@/components/commerce/DonutPreview";

export function DonutConfiguratorSection() {
  const { addItem } = useCart();
  const [baseId, setBaseId] = useState<string>(configuratorBases[0].id);
  const [glazeId, setGlazeId] = useState<string>(configuratorGlazes[0].id);
  const [toppingId, setToppingId] = useState<string>(configuratorToppings[0].id);
  const [justAdded, setJustAdded] = useState(false);

  const base = configuratorBases.find((b) => b.id === baseId)!;
  const glaze = configuratorGlazes.find((g) => g.id === glazeId)!;
  const topping = configuratorToppings.find((t) => t.id === toppingId)!;

  const price = useMemo(
    () =>
      round(configuratorBasePrice + base.priceDelta + glaze.priceDelta + topping.priceDelta),
    [base, glaze, topping],
  );

  function handleAdd() {
    addItem({
      kind: "custom-donut",
      productId: `custom-${baseId}-${glazeId}-${toppingId}`,
      name: "Mi Bucle",
      unitPrice: price,
      quantity: 1,
      configLabel: `${base.label} · ${glaze.label} · ${topping.label}`,
      extras: [],
      notes: "",
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <section className="bg-lime/20 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="order-2 flex justify-center lg:order-1">
          <DonutPreview
            base={baseId}
            glazeColor={glaze.color}
            topping={toppingId}
            className="w-full max-w-sm drop-shadow-xl"
          />
        </div>

        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <SectionHeading
            eyebrow="Monta tu bucle"
            title="Crea tu propio bucle."
            description="Elige base, glaseado y acabado. Lo que ves es lo que muerdes."
          />

          <ConfiguratorGroup
            label="Base"
            options={configuratorBases}
            value={baseId}
            onChange={setBaseId}
          />
          <ConfiguratorGroup
            label="Glaseado"
            options={configuratorGlazes}
            value={glazeId}
            onChange={setGlazeId}
            swatches
          />
          <ConfiguratorGroup
            label="Acabado"
            options={configuratorToppings}
            value={toppingId}
            onChange={setToppingId}
          />

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <span className="font-display text-3xl text-grape">
              {formatPrice(price)}
            </span>
            <button
              type="button"
              onClick={handleAdd}
              className="font-display rounded-full bg-grape px-8 py-4 text-base font-bold tracking-wide text-cream uppercase transition-colors hover:bg-grape-deep"
            >
              {justAdded ? "¡Añadido!" : "Añadir mi bucle"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface Option {
  id: string;
  label: string;
  priceDelta: number;
  color?: string;
}

function ConfiguratorGroup({
  label,
  options,
  value,
  onChange,
  swatches = false,
}: {
  label: string;
  options: readonly Option[];
  value: string;
  onChange: (id: string) => void;
  swatches?: boolean;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-bold tracking-[0.2em] text-cocoa/60 uppercase">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              aria-pressed={active}
              className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "border-grape bg-grape text-cream"
                  : "border-cocoa/20 bg-cream text-cocoa hover:border-grape/50"
              }`}
            >
              {swatches && option.color ? (
                <span
                  className="h-3.5 w-3.5 rounded-full border border-cocoa/20"
                  style={{ backgroundColor: option.color }}
                  aria-hidden="true"
                />
              ) : null}
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
