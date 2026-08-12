"use client";

import type { QuickFilter } from "@/lib/menu/filter-menu";

const FILTERS: { id: QuickFilter; label: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "clasicos", label: "Clásicos" },
  { id: "rellenos", label: "Rellenos" },
  { id: "veganos", label: "Veganos" },
  { id: "mas-vendidos", label: "Más vendidos" },
  { id: "sin-frutos-secos", label: "Sin frutos secos declarados" },
];

interface MenuFiltersProps {
  value: QuickFilter;
  onChange: (filter: QuickFilter) => void;
}

export function MenuFilters({ value, onChange }: MenuFiltersProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filtros de la carta"
    >
      {FILTERS.map((filter) => {
        const active = filter.id === value;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            aria-pressed={active}
            className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
              active
                ? "border-grape bg-grape text-cream"
                : "border-cocoa/15 bg-cream text-cocoa hover:border-grape/50"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
