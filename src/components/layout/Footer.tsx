"use client";

import Link from "next/link";
import { brand } from "@/config/brand";
import { legalLinks, siteConfig } from "@/config/site";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/brand/Logo";
import { SocialIcons } from "@/components/ui/SocialIcons";

export function Footer() {
  function reopenCookiePreferences() {
    window.dispatchEvent(new CustomEvent("bucle:open-cookie-preferences"));
  }

  return (
    <footer className="paper-texture bg-grape text-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Logo variant="cream" showDescriptor />
            <p className="font-display mt-2 text-lg uppercase text-lime">
              No salgas del bucle.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold tracking-[0.2em] text-cream/60 uppercase">
              Navegación
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/" className="hover:text-lime">
                  Inicio
                </Link>
              </li>
              {mainNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-lime">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold tracking-[0.2em] text-cream/60 uppercase">
              Contacto
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-cream/85">
              <li>{siteConfig.contact.phone}</li>
              <li>{siteConfig.contact.email}</li>
            </ul>
            <SocialIcons className="mt-4" />
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold tracking-[0.2em] text-cream/60 uppercase">
              Legal
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-lime">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={reopenCookiePreferences}
                  className="text-left hover:text-lime"
                >
                  Preferencias de cookies
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {brand.name} es una marca ficticia creada con fines de portfolio. ©
            2026 {brand.name}. Proyecto conceptual.
          </p>
          <p>
            {brand.studioCredit.replace("Diseñado por ", "Diseñado por ")}
            {" · "}
            <a
              href={brand.studioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-lime"
            >
              takumistudio.es
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
