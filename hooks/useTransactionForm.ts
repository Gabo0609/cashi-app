import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import {
  transactionSchema,
  type TransactionFormData,
} from "../schemas/transaction.schema";

import type {
  TransactionLocation,
  TransactionType,
} from "../types/transaction";

interface UseTransactionFormProps {
  initialValues?: Partial<TransactionFormData>;
  onSubmit: (data: TransactionFormData) => Promise<void>;
}

export function useTransactionForm({
  initialValues,
  onSubmit,
}: UseTransactionFormProps) {
  const [amount, setAmount] = useState(
    initialValues?.amount ? String(initialValues.amount) : "",
  );

  const [type, setType] = useState<TransactionType>(
    initialValues?.type ?? "expense",
  );

  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );

  const [categoryId, setCategoryId] = useState(initialValues?.categoryId ?? "");
  const [photoUri, setPhotoUri] = useState(initialValues?.photoUri ?? "");

  const [location, setLocation] = useState<TransactionLocation | undefined>(
    initialValues?.location,
  );

  const [errors, setErrors] = useState<{
    amount?: string;
    type?: string;
    description?: string;
    categoryId?: string;
    photoUri?: string;
    location?: string;
  }>({});

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const result = transactionSchema.safeParse({
      amount: Number(amount),
      type,
      description,
      categoryId,
      photoUri: photoUri || undefined,
      location,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        amount: fieldErrors.amount?.[0],
        type: fieldErrors.type?.[0],
        description: fieldErrors.description?.[0],
        categoryId: fieldErrors.categoryId?.[0],
        photoUri: fieldErrors.photoUri?.[0],
        location: fieldErrors.location?.[0],
      });

      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await onSubmit(result.data);
      router.back();
    } catch (err) {
      console.log("ERROR SUBMIT TRANSACTION:", err);
      Alert.alert("Error", "No se pudo guardar la transacción");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    amount,
    type,
    description,
    categoryId,
    photoUri,
    location,
    errors,
    submitting,
    handleAmountChange: setAmount,
    handleTypeChange: setType,
    handleDescriptionChange: setDescription,
    handleCategoryChange: setCategoryId,
    handlePhotoChange: setPhotoUri,
    handleLocationChange: setLocation,
    handleSubmit,
  };
}
