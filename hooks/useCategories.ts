import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

import type { Category } from "../types/category";

const STORAGE_KEY = "categories";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);

      const raw = await AsyncStorage.getItem(STORAGE_KEY);

      const data: Category[] = raw ? JSON.parse(raw) : [];

      setCategories(data);
      setError("");
    } catch {
      setError("No se pudieron cargar las categorías");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const persistCategories = async (nextCategories: Category[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextCategories));

    setCategories(nextCategories);
  };

  const createCategory = async (name: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
    };

    await persistCategories([...categories, newCategory]);
  };

  const updateCategory = async (id: string, name: string) => {
    const updated = categories.map((category) =>
      category.id === id
        ? {
            ...category,
            name,
          }
        : category,
    );

    await persistCategories(updated);
  };

  const deleteCategory = async (id: string) => {
    const filtered = categories.filter((category) => category.id !== id);

    await persistCategories(filtered);
  };

  const getCategoryById = (id: string) => {
    return categories.find((category) => category.id === id);
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
