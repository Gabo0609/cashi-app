import { useCallback, useEffect, useMemo, useState } from "react";

import { apiRequest } from "../lib/api";
import type { Transaction, TransactionType } from "../types/transaction";

interface TransactionInput {
  amount: number;
  type: TransactionType;
  description: string;
  categoryId: string;
  photoUri?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

interface BalanceResponse {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBalance = useCallback(async () => {
    const data = await apiRequest<BalanceResponse>("/transactions/balance");

    setTotalIncome(data.totalIncome);
    setTotalExpense(data.totalExpense);
    setBalance(data.balance);
  }, []);

  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await apiRequest<Transaction[]>("/transactions");

      setTransactions(data);
      await loadBalance();
    } catch (err) {
      console.log("ERROR LOAD TRANSACTIONS:", err);
      setError("No se pudieron cargar las transacciones");
    } finally {
      setLoading(false);
    }
  }, [loadBalance]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const createTransaction = async (input: TransactionInput) => {
    const newTransaction = await apiRequest<Transaction>("/transactions", {
      method: "POST",
      body: {
        amount: input.amount,
        type: input.type,
        description: input.description,
        date: new Date().toISOString(),
        categoryId: Number(input.categoryId),
        receiptUrl: input.photoUri,
        latitude: input.location?.latitude,
        longitude: input.location?.longitude,
      },
    });

    setTransactions((current) => [...current, newTransaction]);
    await loadBalance();
  };

  const updateTransaction = async (id: string, input: TransactionInput) => {
    const updatedTransaction = await apiRequest<Transaction>(
      `/transactions/${id}`,
      {
        method: "PATCH",
        body: {
          amount: input.amount,
          type: input.type,
          description: input.description,
          date: new Date().toISOString(),
          categoryId: Number(input.categoryId),
          receiptUrl: input.photoUri,
          latitude: input.location?.latitude,
          longitude: input.location?.longitude,
        },
      },
    );

    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === Number(id) ? updatedTransaction : transaction,
      ),
    );

    await loadBalance();
  };

  const deleteTransaction = async (id: string) => {
    await apiRequest(`/transactions/${id}`, {
      method: "DELETE",
    });

    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== Number(id)),
    );

    await loadBalance();
  };

  const getTransactionById = (id: string) => {
    return transactions.find((transaction) => transaction.id === Number(id));
  };

  const orderedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [transactions]);

  return {
    transactions: orderedTransactions,
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
