export type FulfillmentMethod = "recogida" | "delivery";

export interface OrderContact {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export interface OrderAddress {
  street: string;
  city: string;
  postalCode: string;
}

export interface DemoOrderConfirmation {
  orderNumber: string;
  createdAt: string;
  fulfillment: FulfillmentMethod;
}
