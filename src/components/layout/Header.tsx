"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { CartButton } from "@/components/commerce/CartButton";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!isHome) return;
    function handleScroll() {
      setScrolled(window.scrollY > 48);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const solid = !isHome || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 w-full transition-all duration-300 ${
        solid
          ? "border-b-2 border-cocoa/10 bg-cream/95 backdrop-blur-sm"
          : "border-b-2 border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          solid ? "h-16" : "h-20"
        }`}
      >
        <Logo variant={solid ? "grape" : "cream"} />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navegación principal"
        >
          {mainNav.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`font-display rounded-md px-4 py-2 text-base uppercase tracking-wide transition-colors ${
                  solid
                    ? "text-cocoa hover:bg-grape/10"
                    : "text-cream hover:bg-white/10"
                } ${isActive ? "text-strawberry" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:block">
            <Button href="/pedido" size="sm">
              Pedir ahora
            </Button>
          </div>
          <CartButton tone={solid ? "dark" : "light"} />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${
              solid ? "text-cocoa hover:bg-grape/10" : "text-cream hover:bg-white/10"
            }`}
            aria-label="Abrir menú de navegación"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
