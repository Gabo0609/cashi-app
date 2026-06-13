import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { apiRequest } from "../lib/api";
import type { Category } from "../types/category";

export function useCategories() {
  const { token } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getErrorMessage = (err: unknown) => {
    return err instanceof Error ? err.message : "Error de conexión";
  };

  const loadCategories = useCallback(async () => {
    if (!token) {
      setCategories([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await apiRequest<Category[]>("/categories", {
        token,
      });

      setCategories(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const createCategory = async (name: string) => {
    try {
      setError("");

      const category = await apiRequest<Category>("/categories", {
        method: "POST",
        body: { name },
        token,
      });

      setCategories((current) => [...current, category]);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      Alert.alert("Error", message);
    }
  };

  const updateCategory = async (id: string | number, name: string) => {
    try {
      setError("");

      const category = await apiRequest<Category>(`/categories/${id}`, {
        method: "PATCH",
        body: { name },
        token,
      });

      setCategories((current) =>
        current.map((item) => (item.id === Number(id) ? category : item)),
      );
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      Alert.alert("Error", message);
    }
  };

  const deleteCategory = async (id: string | number) => {
    try {
      setError("");

      await apiRequest(`/categories/${id}`, {
        method: "DELETE",
        token,
      });

      setCategories((current) =>
        current.filter((category) => category.id !== Number(id)),
      );

      Alert.alert(
        "Categoría eliminada",
        "La categoría fue eliminada correctamente",
      );
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      Alert.alert("No se pudo eliminar", message);
    }
  };

  const getCategoryById = (id: string | number) => {
    return categories.find((category) => category.id === Number(id));
  };

  return {
    categories,
    loading,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
  };
}
