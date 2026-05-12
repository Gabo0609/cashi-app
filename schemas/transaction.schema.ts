import * as z from "zod";

export const transactionSchema = z.object({
  amount: z.number().positive("El monto debe ser mayor a 0"),
  type: z.enum(["income", "expense"]),
  description: z.string().min(1, "La descripción es obligatoria"),
  categoryId: z.string().min(1, "Selecciona una categoría"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
