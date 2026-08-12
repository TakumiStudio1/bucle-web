/**
 * Site-wide configuration. All values here are placeholders for a
 * conceptual/demo brand — replace with real data before any production
 * deployment. See README.md → "Personalizar el proyecto".
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bucle-donuts.example",
  basePath,
  name: "BUCLE | Donuts + Coffee",
  shortName: "BUCLE",
  description:
    "BUCLE: donuts recién hechos, café sin rodeos y una regla muy simple — uno lleva a otro. Proyecto conceptual de Takumi Studio.",
  locale: "es_ES",
  themeColor: "#35134F",

  contact: {
    email: "hola@bucle.demo",
    phone: "+34 900 000 000",
    whatsapp: "+34 600 000 000",
  },

  social: {
    instagram: "https://instagram.com/bucle.donuts",
    tiktok: "https://tiktok.com/@bucle.donuts",
    facebook: "https://facebook.com/bucle.donuts",
  },

  legal: {
    razonSocial: "Bucle Donuts Club S.L. (dato ficticio de demostración)",
    cif: "B00000000 (dato ficticio de demostración)",
    domicilio: "Calle Ficticia 1, 41001 Sevilla (dato ficticio de demostración)",
    correoLegal: "legal@bucle.demo",
    registro: "Registro Mercantil de Sevilla (dato ficticio de demostración)",
  },

  demoMode: true,
} as const;

export const legalLinks = [
  { label: "Aviso legal", href: "/legal/aviso-legal" },
  { label: "Privacidad", href: "/legal/privacidad" },
  { label: "Cookies", href: "/legal/cookies" },
] as const;
