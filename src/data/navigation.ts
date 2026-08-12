import type { NavLink } from "@/types/navigation";

export const mainNav: NavLink[] = [
  { label: "Carta", href: "/carta" },
  { label: "Locales", href: "/locales" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export const footerNav: NavLink[] = [
  { label: "Inicio", href: "/" },
  ...mainNav,
  { label: "Pedido", href: "/pedido" },
];
