"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { FulfillmentMethod, OrderAddress, OrderContact } from "@/types/order";
import { locations } from "@/data/locations";
import { orderConfig } from "@/config/order";
import {
  orderAddressSchema,
  orderContactSchema,
  type OrderAddressValues,
  type OrderContactValues,
} from "@/lib/validation/order-schema";

interface OrderFormProps {
  fulfillment: FulfillmentMethod;
  onFulfillmentChange: (value: FulfillmentMethod) => void;
  locationId: string;
  onLocationChange: (value: string) => void;
  pickupWindow: string;
  onPickupWindowChange: (value: string) => void;
  onSubmit: (contact: OrderContact, address?: OrderAddress) => void;
  submitting: boolean;
}

export function OrderForm({
  fulfillment,
  onFulfillmentChange,
  locationId,
  onLocationChange,
  pickupWindow,
  onPickupWindowChange,
  onSubmit,
  submitting,
}: OrderFormProps) {
  const contactForm = useForm<OrderContactValues>({
    resolver: zodResolver(orderContactSchema),
    defaultValues: { name: "", email: "", phone: "", notes: "" },
  });
  const addressForm = useForm<OrderAddressValues>({
    resolver: zodResolver(orderAddressSchema),
    defaultValues: { street: "", city: "", postalCode: "" },
  });

  async function handleSubmit() {
    const contactValid = await contactForm.trigger();
    const addressValid =
      fulfillment === "delivery" ? await addressForm.trigger() : true;
    if (!contactValid || !addressValid) return;

    const contact = contactForm.getValues();
    const address = fulfillment === "delivery" ? addressForm.getValues() : undefined;
    onSubmit(
      { name: contact.name, email: contact.email, phone: contact.phone, notes: contact.notes ?? "" },
      address,
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <fieldset>
        <legend className="mb-3 text-xs font-bold tracking-[0.2em] text-cocoa/60 uppercase">
          ¿Cómo lo quieres?
        </legend>
        <div className="flex gap-3">
          {(["recogida", "delivery"] as const).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => onFulfillmentChange(method)}
              aria-pressed={fulfillment === method}
              className={`flex-1 rounded-2xl border-2 py-3 text-sm font-bold uppercase transition-colors ${
                fulfillment === method
                  ? "border-grape bg-grape text-cream"
                  : "border-cocoa/15 text-cocoa hover:border-grape/50"
              }`}
            >
              {method === "recogida" ? "Recogida" : "Delivery"}
            </button>
          ))}
        </div>
      </fieldset>

      {fulfillment === "recogida" ? (
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="pickup-location" className="mb-1 block text-sm font-semibold">
              Local
            </label>
            <select
              id="pickup-location"
              value={locationId}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full rounded-xl border-2 border-cocoa/15 bg-cream px-4 py-3 text-sm"
            >
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pickup-window" className="mb-1 block text-sm font-semibold">
              Franja horaria
            </label>
            <select
              id="pickup-window"
              value={pickupWindow}
              onChange={(e) => onPickupWindowChange(e.target.value)}
              className="w-full rounded-xl border-2 border-cocoa/15 bg-cream px-4 py-3 text-sm"
            >
              {orderConfig.pickupWindows.map((window) => (
                <option key={window} value={window}>
                  {window}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Field
            label="Dirección"
            error={addressForm.formState.errors.street?.message}
          >
            <input
              type="text"
              className="w-full rounded-xl border-2 border-cocoa/15 bg-cream px-4 py-3 text-sm"
              {...addressForm.register("street")}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Ciudad" error={addressForm.formState.errors.city?.message}>
              <input
                type="text"
                className="w-full rounded-xl border-2 border-cocoa/15 bg-cream px-4 py-3 text-sm"
                {...addressForm.register("city")}
              />
            </Field>
            <Field
              label="Código postal"
              error={addressForm.formState.errors.postalCode?.message}
            >
              <input
                type="text"
                inputMode="numeric"
                className="w-full rounded-xl border-2 border-cocoa/15 bg-cream px-4 py-3 text-sm"
                {...addressForm.register("postalCode")}
              />
            </Field>
          </div>
          <p className="text-xs text-cocoa/50">
            Estos datos solo se guardan en tu navegador durante esta sesión.
          </p>
        </div>
      )}

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-1 text-xs font-bold tracking-[0.2em] text-cocoa/60 uppercase">
          Tus datos
        </legend>
        <Field label="Nombre" error={contactForm.formState.errors.name?.message}>
          <input
            type="text"
            className="w-full rounded-xl border-2 border-cocoa/15 bg-cream px-4 py-3 text-sm"
            {...contactForm.register("name")}
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Email" error={contactForm.formState.errors.email?.message}>
            <input
              type="email"
              className="w-full rounded-xl border-2 border-cocoa/15 bg-cream px-4 py-3 text-sm"
              {...contactForm.register("email")}
            />
          </Field>
          <Field label="Teléfono" error={contactForm.formState.errors.phone?.message}>
            <input
              type="tel"
              className="w-full rounded-xl border-2 border-cocoa/15 bg-cream px-4 py-3 text-sm"
              {...contactForm.register("phone")}
            />
          </Field>
        </div>
        <Field label="Notas (opcional)">
          <textarea
            rows={3}
            className="w-full rounded-xl border-2 border-cocoa/15 bg-cream px-4 py-3 text-sm"
            {...contactForm.register("notes")}
          />
        </Field>
      </fieldset>

      <p className="text-xs text-cocoa/60">
        Proyecto conceptual. No se realizará ningún cobro ni se enviará
        información.
      </p>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className="font-display rounded-full bg-lime px-6 py-4 text-sm font-bold tracking-wide text-cocoa uppercase hover:bg-lime-soft disabled:opacity-60"
      >
        {submitting ? "Confirmando…" : "Confirmar pedido de demostración"}
      </button>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-semibold">
      {label}
      {children}
      {error ? <span className="text-xs font-normal text-strawberry">{error}</span> : null}
    </label>
  );
}
