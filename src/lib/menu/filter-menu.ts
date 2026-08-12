import type { MenuItem, ProductTag } from "@/types/menu";

export type QuickFilter =
  | "todo"
  | "clasicos"
  | "rellenos"
  | "veganos"
  | "mas-vendidos"
  | "sin-frutos-secos";

const FILTER_TAG: Partial<Record<QuickFilter, ProductTag>> = {
  clasicos: "clasico",
  rellenos: "relleno",
  veganos: "vegano",
  "mas-vendidos": "mas-vendido",
};

export function filterMenu(
  items: MenuItem[],
  { query, filter }: { query: string; filter: QuickFilter },
): MenuItem[] {
  const normalizedQuery = normalize(query.trim());

  return items.filter((item) => {
    if (filter === "sin-frutos-secos" && item.tags.includes("frutos-secos")) {
      return false;
    }
    const tag = FILTER_TAG[filter];
    if (tag && !item.tags.includes(tag)) {
      return false;
    }

    if (!normalizedQuery) return true;

    const haystack = normalize(
      `${item.name} ${item.description} ${item.tags.join(" ")}`,
    );
    return haystack.includes(normalizedQuery);
  });
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}
