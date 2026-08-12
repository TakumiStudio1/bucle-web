import { z } from "zod";

export const orderContactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre."),
  email: z.string().trim().email("Escribe un email válido."),
  phone: z.string().trim().min(6, "Escribe un teléfono válido."),
  notes: z.string().trim().optional().or(z.literal("")),
});

export const orderAddressSchema = z.object({
  street: z.string().trim().min(3, "Escribe una dirección."),
  city: z.string().trim().min(2, "Escribe una ciudad."),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Escribe un código postal de 5 dígitos."),
});

export type OrderContactValues = z.infer<typeof orderContactSchema>;
export type OrderAddressValues = z.infer<typeof orderAddressSchema>;
