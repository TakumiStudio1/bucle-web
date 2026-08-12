import { brand } from "@/config/brand";
import { siteConfig } from "@/config/site";

/**
 * Deliberately uses generic CreativeWork/WebSite schema instead of
 * LocalBusiness or Product — BUCLE is a fictional portfolio brand and
 * must never present itself to search engines as a real business.
 */
export function creativeWorkJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: siteConfig.name,
    description: siteConfig.description,
    creator: {
      "@type": "Organization",
      name: "Takumi Studio",
      url: brand.studioUrl,
    },
    about: "Proyecto conceptual de identidad de marca y desarrollo web.",
    dateCreated: "2026",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "es-ES",
  };
}
