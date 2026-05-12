import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { Transaction, TransactionType } from "../types/transaction";

const STORAGE_KEY = "transactions";

interface TransactionInput {
  amount: number;
  type: TransactionType;
  description: string;
  categoryId: string;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);

      const raw = await AsyncStorage.getItem(STORAGE_KEY);

      const data: Transaction[] = raw ? JSON.parse(raw) : [];

      setTransactions(data);
      setError("");
    } catch {
      setError("No se pudieron cargar las transacciones");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const persistTransactions = async (nextTransactions: Transaction[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextTransactions));

    setTransactions(nextTransactions);
  };

  const createTransaction = async (input: TransactionInput) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: input.amount,
      type: input.type,
      description: input.description,
      categoryId: input.categoryId,
      date: new Date().toISOString(),
    };

    await persistTransactions([...transactions, newTransaction]);
  };

  const updateTransaction = async (id: string, input: TransactionInput) => {
    const updated = transactions.map((transaction) =>
      transaction.id === id
        ? {
            ...transaction,
            amount: input.amount,
            type: input.type,
            description: input.description,
            categoryId: input.categoryId,
          }
        : transaction,
    );

    await persistTransactions(updated);
  };

  const deleteTransaction = async (id: string) => {
    const filtered = transactions.filter(
      (transaction) => transaction.id !== id,
    );

    await persistTransactions(filtered);
  };

  const getTransactionById = (id: string) => {
    return transactions.find((transaction) => transaction.id === id);
  };

  const totalIncome = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }, [transactions]);

  const balance = useMemo(() => {
    return totalIncome - totalExpense;
  }, [totalIncome, totalExpense]);

  return {
    transactions,
    loading,
    error,
    loadTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
    totalIncome,
    totalExpense,
    balance,
  };
}
