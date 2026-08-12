"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`absolute inset-0 flex flex-col bg-grape text-cream transition-all duration-500 ${
          isOpen
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
        style={{ transformOrigin: "top right" }}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <span className="font-display text-2xl uppercase text-cream">
            {pathname === "/" ? "Menú" : "BUCLE"}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Cerrar menú"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav
          className="flex flex-1 flex-col items-start justify-center gap-2 px-8"
          aria-label="Navegación móvil"
        >
          {mainNav.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="font-display py-2 text-4xl uppercase text-cream transition-colors hover:text-lime"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-8 pb-10">
          <Button href="/pedido" onClick={onClose} className="w-full">
            Pedir ahora
          </Button>
        </div>
      </div>
    </div>
  );
}
