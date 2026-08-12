"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "bucle-cookie-preferences";

function loadPreferences(): CookiePreferences | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookiePreferences) : null;
  } catch {
    return null;
  }
}

function savePreferences(prefs: CookiePreferences) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // ignore
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // localStorage is only readable client-side; this one-time sync on mount
  // can't be replaced by a lazy useState initializer without desyncing SSR.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const stored = loadPreferences();
    if (!stored) setVisible(true);
    /* eslint-enable react-hooks/set-state-in-effect */

    function handleReopen() {
      const current = loadPreferences();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setVisible(true);
      setShowSettings(true);
    }
    window.addEventListener("bucle:open-cookie-preferences", handleReopen);
    return () =>
      window.removeEventListener("bucle:open-cookie-preferences", handleReopen);
  }, []);

  useEffect(() => {
    if (showSettings) dialogRef.current?.focus();
  }, [showSettings]);

  function acceptAll() {
    savePreferences({ necessary: true, analytics: true, marketing: true });
    setVisible(false);
    setShowSettings(false);
  }

  function rejectAll() {
    savePreferences({ necessary: true, analytics: false, marketing: false });
    setVisible(false);
    setShowSettings(false);
  }

  function saveCustom() {
    savePreferences({ necessary: true, analytics, marketing });
    setVisible(false);
    setShowSettings(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-2xl border-2 border-cocoa bg-cream p-5 shadow-2xl sm:p-6">
        {!showSettings ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-cocoa">
              Usamos cookies necesarias para que la web funcione. Este es un
              proyecto conceptual: no se cargan herramientas analíticas
              reales, pero puedes elegir tu preferencia igualmente.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="sm" onClick={acceptAll}>
                Aceptar
              </Button>
              <Button size="sm" variant="dark" onClick={rejectAll}>
                Rechazar
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="border-2 border-cocoa/20"
                onClick={() => setShowSettings(true)}
              >
                Configurar
              </Button>
            </div>
          </div>
        ) : (
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Preferencias de cookies"
            tabIndex={-1}
            className="flex flex-col gap-4"
          >
            <h2 className="font-display text-xl uppercase text-grape">
              Preferencias de cookies
            </h2>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" checked disabled className="mt-1 h-4 w-4" />
              <span>
                <strong>Necesarias.</strong> Siempre activas — permiten que la
                web funcione (carrito, navegación).
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>
                <strong>Analíticas.</strong> Ayudarían a entender el uso de la
                web (sin activar en esta demo).
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>
                <strong>Marketing.</strong> Permitirían personalizar
                promociones (sin activar en esta demo).
              </span>
            </label>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="sm" onClick={saveCustom}>
                Guardar preferencias
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="border-2 border-cocoa/20"
                onClick={() => setShowSettings(false)}
              >
                Volver
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
