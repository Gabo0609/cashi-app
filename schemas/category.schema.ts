import * as z from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
