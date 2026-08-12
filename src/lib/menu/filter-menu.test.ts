import { describe, expect, it } from "vitest";
import { filterMenu } from "./filter-menu";
import { donuts } from "@/data/products";

describe("filterMenu", () => {
  it("returns everything for the default filter and empty query", () => {
    expect(filterMenu(donuts, { query: "", filter: "todo" })).toHaveLength(donuts.length);
  });

  it("filters by quick tag", () => {
    const result = filterMenu(donuts, { query: "", filter: "veganos" });
    expect(result.every((item) => item.tags.includes("vegano"))).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("excludes items with declared nuts when requested", () => {
    const result = filterMenu(donuts, { query: "", filter: "sin-frutos-secos" });
    expect(result.some((item) => item.tags.includes("frutos-secos"))).toBe(false);
  });

  it("matches by name case- and accent-insensitively", () => {
    const result = filterMenu(donuts, { query: "pistacho", filter: "todo" });
    expect(result.some((item) => item.name === "Pistacho Infinito")).toBe(true);
  });

  it("matches by description text", () => {
    const result = filterMenu(donuts, { query: "caramelo salado", filter: "todo" });
    expect(result.some((item) => item.id === "caramelo-orbita")).toBe(true);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterMenu(donuts, { query: "xyzxyz", filter: "todo" })).toHaveLength(0);
  });
});
