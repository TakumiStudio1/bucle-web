"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { boxes, donuts } from "@/data/products";
import { canAddMore, countSelected, isBoxComplete, type BoxSelection } from "@/lib/menu/box-builder";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice } from "@/lib/cart/cart-math";

export function BoxBuilder() {
  const { addItem } = useCart();
  const [boxId, setBoxId] = useState(boxes[1].id);
  const [selection, setSelection] = useState<BoxSelection>({});
  const [justAdded, setJustAdded] = useState(false);

  const box = boxes.find((b) => b.id === boxId)!;
  const selectedCount = countSelected(selection);
  const complete = isBoxComplete(selection, box.size);

  function changeBox(id: string) {
    setBoxId(id);
    setSelection({});
  }

  function adjust(donutId: string, delta: number) {
    setSelection((prev) => {
      const current = prev[donutId] ?? 0;
      if (delta > 0 && !canAddMore(prev, box.size)) return prev;
      const next = Math.max(0, current + delta);
      const updated = { ...prev, [donutId]: next };
      if (next === 0) delete updated[donutId];
      return updated;
    });
  }

  const contents = useMemo(
    () =>
      Object.entries(selection)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => {
          const donut = donuts.find((d) => d.id === id)!;
          return { name: donut.name, count: qty };
        }),
    [selection],
  );

  function handleAdd() {
    if (!complete) return;
    addItem({
      kind: "box",
      productId: box.id,
      name: box.name,
      image: box.image,
      unitPrice: box.basePrice,
      quantity: 1,
      configLabel: contents.map((c) => `${c.count}× ${c.name}`).join(", "),
      extras: [],
      notes: "",
      boxContents: contents,
    });
    setJustAdded(true);
    setSelection({});
    window.setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      <div className="flex flex-col gap-4 lg:w-64 lg:shrink-0">
        {boxes.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => changeBox(option.id)}
            aria-pressed={option.id === boxId}
            className={`flex items-center gap-4 rounded-2xl border-2 p-3 text-left transition-colors ${
              option.id === boxId
                ? "border-grape bg-grape/5"
                : "border-cocoa/10 hover:border-cocoa/30"
            }`}
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
              <Image src={option.image} alt="" fill sizes="64px" className="object-cover" />
            </div>
            <div>
              <p className="font-display text-lg uppercase text-cocoa">{option.name}</p>
              <p className="text-sm text-cocoa/60">
                Desde {formatPrice(option.basePrice)}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-display text-lg text-cocoa" aria-live="polite">
            {selectedCount} de {box.size} elegidos
          </p>
          <div className="h-2 flex-1 max-w-40 overflow-hidden rounded-full bg-cocoa/10 ml-4">
            <div
              className="h-full rounded-full bg-lime transition-all"
              style={{ width: `${Math.min(100, (selectedCount / box.size) * 100)}%` }}
            />
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {donuts.map((donut) => {
            const qty = selection[donut.id] ?? 0;
            return (
              <li
                key={donut.id}
                className="flex items-center gap-3 rounded-xl border border-cocoa/10 p-2"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  {donut.image ? (
                    <Image src={donut.image} alt="" fill sizes="48px" className="object-cover" />
                  ) : null}
                </div>
                <span className="flex-1 text-sm font-medium text-cocoa">
                  {donut.name}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => adjust(donut.id, -1)}
                    disabled={qty === 0}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-cocoa/20 disabled:opacity-30"
                    aria-label={`Quitar ${donut.name} de la caja`}
                  >
                    <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  <span className="min-w-4 text-center text-sm" aria-live="polite">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => adjust(donut.id, 1)}
                    disabled={!canAddMore(selection, box.size)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-cocoa/20 disabled:opacity-30"
                    aria-label={`Añadir ${donut.name} a la caja`}
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={handleAdd}
          disabled={!complete}
          className="font-display mt-6 w-full rounded-full bg-lime px-6 py-4 text-sm font-bold tracking-wide text-cocoa uppercase transition-colors hover:bg-lime-soft disabled:cursor-not-allowed disabled:opacity-40"
        >
          {justAdded
            ? "¡Caja añadida!"
            : complete
              ? `Añadir ${box.name} — ${formatPrice(box.basePrice)}`
              : `Elige ${box.size - selectedCount} más para completar la caja`}
        </button>
      </div>
    </div>
  );
}
