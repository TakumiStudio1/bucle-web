export type CartLineKind = "product" | "custom-donut" | "box";

export interface CartExtraSelection {
  id: string;
  label: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  lineId: string;
  kind: CartLineKind;
  productId: string;
  name: string;
  image?: string;
  unitPrice: number;
  quantity: number;
  configLabel?: string;
  extras: CartExtraSelection[];
  notes: string;
  boxContents?: { name: string; count: number }[];
}

export interface CartTotals {
  subtotal: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
}
