import type { CartItem, CartTotals } from "@/types/cart";
import type { FulfillmentMethod, OrderAddress, OrderContact } from "@/types/order";

export interface DemoCheckoutInput {
  items: CartItem[];
  totals: CartTotals;
  fulfillment: FulfillmentMethod;
  locationId?: string;
  pickupWindow?: string;
  address?: OrderAddress;
  contact: OrderContact;
}
