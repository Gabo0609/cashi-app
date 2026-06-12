import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.number().positive("El monto debe ser mayor a 0"),
  type: z.enum(["income", "expense"]),
  description: z.string().min(1, "La descripción es obligatoria"),
  categoryId: z.coerce.string().min(1, "Selecciona una categoría"),
  photoUri: z.string().optional(),
  location: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
