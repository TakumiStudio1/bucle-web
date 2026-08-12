export interface BoxSelection {
  [donutId: string]: number;
}

export function countSelected(selection: BoxSelection): number {
  return Object.values(selection).reduce((sum, qty) => sum + qty, 0);
}

export function isBoxComplete(selection: BoxSelection, size: number): boolean {
  return countSelected(selection) === size;
}

export function canAddMore(selection: BoxSelection, size: number): boolean {
  return countSelected(selection) < size;
}
