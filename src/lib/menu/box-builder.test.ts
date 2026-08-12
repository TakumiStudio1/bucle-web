import { describe, expect, it } from "vitest";
import { canAddMore, countSelected, isBoxComplete } from "./box-builder";

describe("box-builder", () => {
  it("counts total selected units across donuts", () => {
    expect(countSelected({ a: 2, b: 1 })).toBe(3);
  });

  it("is not complete until the selection matches the box size", () => {
    expect(isBoxComplete({ a: 2, b: 1 }, 6)).toBe(false);
    expect(isBoxComplete({ a: 3, b: 3 }, 6)).toBe(true);
  });

  it("refuses a box larger than its declared size", () => {
    expect(isBoxComplete({ a: 4, b: 3 }, 6)).toBe(false);
  });

  it("stops allowing more items once the box is full", () => {
    expect(canAddMore({ a: 6 }, 6)).toBe(false);
    expect(canAddMore({ a: 5 }, 6)).toBe(true);
  });
});
