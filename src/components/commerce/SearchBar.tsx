"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-cocoa/40"
        aria-hidden="true"
      />
      <label htmlFor="menu-search" className="sr-only">
        Buscar en la carta
      </label>
      <input
        id="menu-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Busca por nombre o ingrediente"
        className="w-full rounded-full border-2 border-cocoa/15 bg-cream py-3 pr-4 pl-11 text-sm focus:border-grape"
      />
    </div>
  );
}
