import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

import { apiRequest } from "../lib/api";
import type { Category } from "../types/category";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await apiRequest<Category[]>("/categories");
      setCategories(data);
    } catch (err) {
      console.log("ERROR LOAD CATEGORIES:", err);
      setError("No se pudieron cargar las categorías");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const createCategory = async (name: string) => {
    try {
      setError("");

      const category = await apiRequest<Category>("/categories", {
        method: "POST",
        body: { name },
      });

      setCategories((current) => [...current, category]);
    } catch (err) {
      console.log("ERROR CREATE CATEGORY:", err);
      Alert.alert("Error", "No se pudo crear la categoría");
    }
  };

  const updateCategory = async (id: string | number, name: string) => {
    try {
      setError("");

      const category = await apiRequest<Category>(`/categories/${id}`, {
        method: "PATCH",
        body: { name },
      });

      setCategories((current) =>
        current.map((item) => (item.id === Number(id) ? category : item)),
      );
    } catch (err) {
      console.log("ERROR UPDATE CATEGORY:", err);
      Alert.alert("Error", "No se pudo actualizar la categoría");
    }
  };

  const deleteCategory = async (id: string | number) => {
    try {
      setError("");

      await apiRequest(`/categories/${id}`, {
        method: "DELETE",
      });

      setCategories((current) =>
        current.filter((category) => category.id !== Number(id)),
      );

      Alert.alert(
        "Categoría eliminada",
        "La categoría fue eliminada correctamente",
      );
    } catch (err) {
      console.log("ERROR DELETE CATEGORY:", err);
      Alert.alert(
        "No se pudo eliminar",
        "La categoría puede estar asociada a una transacción o hubo un error en el servidor.",
      );
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
