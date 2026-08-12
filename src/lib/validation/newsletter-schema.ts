import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().trim().email("Escribe un email válido."),
  privacy: z.literal(true, {
    error: "Debes aceptar la política de privacidad.",
  }),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
