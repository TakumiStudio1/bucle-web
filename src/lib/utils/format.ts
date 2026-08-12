export function formatOrderNumber(date = new Date()): string {
  const stamp = date
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(2, 12);
  const random = Math.floor(Math.random() * 90 + 10);
  return `BUCLE-${stamp}${random}`;
}
