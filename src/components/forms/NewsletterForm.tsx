"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/validation/newsletter-schema";

export function NewsletterForm() {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSuccess(true);
    reset();
    window.setTimeout(() => setSuccess(false), 4000);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full max-w-md flex-col gap-3"
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="tu@email.com"
            className="w-full rounded-full border-2 border-cream/30 bg-transparent px-5 py-3 text-cream placeholder:text-cream/50 focus:border-lime"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "newsletter-email-error" : undefined}
            {...register("email")}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="font-display rounded-full bg-lime px-6 py-3 text-sm font-bold tracking-wide text-cocoa uppercase hover:bg-lime-soft disabled:opacity-60"
        >
          Quiero entrar
        </button>
      </div>
      {errors.email ? (
        <p id="newsletter-email-error" className="text-sm text-strawberry">
          {errors.email.message}
        </p>
      ) : null}

      <label className="flex items-start gap-2 text-xs text-cream/70">
        <input type="checkbox" className="mt-0.5 h-4 w-4" {...register("privacy")} />
        Acepto la política de privacidad (demostración, no se envían datos).
      </label>
      {errors.privacy ? (
        <p className="text-sm text-strawberry">{errors.privacy.message}</p>
      ) : null}

      <p aria-live="polite" className="text-sm text-lime">
        {success ? "Listo. Ya estás en el club (demostración)." : ""}
      </p>
    </form>
  );
}
