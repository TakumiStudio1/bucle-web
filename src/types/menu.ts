export type MenuCategoryId =
  | "donuts"
  | "cajas"
  | "cafe"
  | "frios"
  | "extras";

export type ProductTag =
  | "clasico"
  | "relleno"
  | "especial"
  | "vegano"
  | "premium"
  | "nuevo"
  | "mas-vendido"
  | "frutos-secos"
  | "vegetariano";

export interface ProductOptionChoice {
  id: string;
  label: string;
  priceDelta: number;
}

export interface ProductOptionGroup {
  id: string;
  label: string;
  required: boolean;
  multiple: boolean;
  choices: ProductOptionChoice[];
}

export interface ProductExtra {
  id: string;
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  priceLabel?: string;
  category: MenuCategoryId;
  image?: string;
  tags: ProductTag[];
  allergens: string[];
  extraIds?: string[];
  available: boolean;
  featured?: boolean;
  order: number;
}

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  shortLabel: string;
  description?: string;
}

export interface BoxOption {
  id: string;
  name: string;
  size: 3 | 6 | 12;
  basePrice: number;
  image: string;
}
