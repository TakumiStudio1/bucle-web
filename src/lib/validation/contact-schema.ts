import { z } from "zod";

export const contactReasons = [
  { value: "info", label: "Información general" },
  { value: "pedido", label: "Pedido" },
  { value: "eventos", label: "Eventos" },
  { value: "colaboraciones", label: "Colaboraciones" },
  { value: "prensa", label: "Prensa" },
  { value: "franquicias", label: "Franquicias" },
  { value: "otro", label: "Otro" },
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre completo."),
  email: z.string().trim().email("Escribe un email válido."),
  phone: z.string().trim().optional().or(z.literal("")),
  reason: z.enum(contactReasons.map((r) => r.value) as [string, ...string[]], {
    error: "Elige un motivo.",
  }),
  message: z.string().trim().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)."),
  privacy: z.literal(true, {
    error: "Debes aceptar la política de privacidad.",
  }),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
