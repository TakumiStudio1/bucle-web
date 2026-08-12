"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  contactReasons,
  contactSchema,
  type ContactFormValues,
} from "@/lib/validation/contact-schema";

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { reason: "info" },
  });

  async function onSubmit(values: ContactFormValues) {
    if (values.website) return; // honeypot triggered — silently drop
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSuccess(true);
    reset({ reason: "info" });
  }

  if (success) {
    return (
      <div className="rounded-2xl border-2 border-lime bg-lime/10 px-6 py-8 text-center">
        <p className="font-display text-2xl uppercase text-grape">
          Mensaje recibido.
        </p>
        <p className="mt-2 text-sm text-cocoa/70">
          Esto es una demostración: tu mensaje no se ha enviado a ningún
          servidor.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="font-display mt-4 rounded-full bg-grape px-6 py-2 text-sm font-bold text-cream uppercase"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
        {...register("website")}
      />

      <Field label="Nombre" error={errors.name?.message}>
        <input
          type="text"
          className="w-full rounded-xl border-2 border-cocoa/15 bg-cream px-4 py-3 text-sm"
          {...register("name")}
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Correo electrónico" error={errors.email?.message}>
          <input
            type="email"
            className="w-full rounded-xl border-2 border-cocoa/15 bg-cream px-4 py-3 text-sm"
            {...register("email")}
          />
        </Field>
        <Field label="Teléfono (opcional)" error={errors.phone?.message}>
          <input
            type="tel"
            className="w-full rounded-xl border-2 border-cocoa/15 bg-cream px-4 py-3 text-sm"
            {...register("phone")}
          />
        </Field>
      </div>

      <Field label="Motivo" error={errors.reason?.message}>
        <select
          className="w-full rounded-xl border-2 border-cocoa/15 bg-cream px-4 py-3 text-sm"
          {...register("reason")}
        >
          {contactReasons.map((reason) => (
            <option key={reason.value} value={reason.value}>
              {reason.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Mensaje" error={errors.message?.message}>
        <textarea
          rows={5}
          className="w-full rounded-xl border-2 border-cocoa/15 bg-cream px-4 py-3 text-sm"
          {...register("message")}
        />
      </Field>

      <label className="flex items-start gap-2 text-sm text-cocoa/70">
        <input type="checkbox" className="mt-1 h-4 w-4" {...register("privacy")} />
        He leído y acepto la política de privacidad (demostración).
      </label>
      {errors.privacy ? (
        <p className="-mt-3 text-sm text-strawberry">{errors.privacy.message}</p>
      ) : null}

      <p className="text-xs text-cocoa/50">
        Este formulario forma parte de un proyecto conceptual y no envía
        mensajes a ningún servidor.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="font-display w-fit rounded-full bg-lime px-8 py-3 text-sm font-bold tracking-wide text-cocoa uppercase hover:bg-lime-soft disabled:opacity-60"
      >
        Enviar mensaje
      </button>
    </form>
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
    <label className="flex flex-col gap-1 text-sm font-semibold text-cocoa">
      {label}
      {children}
      {error ? <span className="text-xs font-normal text-strawberry">{error}</span> : null}
    </label>
  );
}
