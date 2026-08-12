import type { DemoOrderConfirmation } from "@/types/order";
import { formatOrderNumber } from "@/lib/utils/format";
import type { DemoCheckoutInput } from "./types";

/**
 * Stands in for a real checkout provider. Never calls a network endpoint —
 * everything stays in the browser, matching the "proyecto conceptual, sin
 * cobros reales" promise made throughout the UI.
 */
export async function submitDemoOrder(
  input: DemoCheckoutInput,
): Promise<DemoOrderConfirmation> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    orderNumber: formatOrderNumber(),
    createdAt: new Date().toISOString(),
    fulfillment: input.fulfillment,
  };
}
