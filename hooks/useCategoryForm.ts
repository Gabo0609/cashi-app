import { router } from "expo-router";
import { useState } from "react";

import { categorySchema } from "../schemas/category.schema";

interface UseCategoryFormProps {
  initialName?: string;
  onSubmit: (name: string) => Promise<void>;
}

export function useCategoryForm({
  initialName = "",
  onSubmit,
}: UseCategoryFormProps) {
  const [name, setName] = useState(initialName);

  const [errors, setErrors] = useState<{
    name?: string;
  }>({});

  const [submitting, setSubmitting] = useState(false);

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleSubmit = async () => {
    const result = categorySchema.safeParse({
      name,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0],
      });

      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await onSubmit(result.data.name);

      router.back();
    } finally {
      setSubmitting(false);
    }
  };

  return {
    name,
    errors,
    submitting,
    handleNameChange,
    handleSubmit,
  };
}
