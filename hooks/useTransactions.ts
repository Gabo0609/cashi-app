import { useCallback, useEffect, useMemo, useState } from "react";

import { API_URL } from "../constants/api";
import { useAuth } from "../contexts/AuthContext";
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

interface UploadResponse {
  receiptUrl?: string;
  imageUrl?: string;
}

export function useTransactions() {
  const { token } = useAuth();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getErrorMessage = (err: unknown) => {
    return err instanceof Error ? err.message : "Error de conexión";
  };

  const uploadReceipt = useCallback(
    async (photoUri?: string) => {
      if (!photoUri || photoUri.startsWith("http")) {
        return photoUri;
      }

      if (!token) {
        throw new Error("Token no disponible");
      }

      const formData = new FormData();

      formData.append("receipt", {
        uri: photoUri,
        name: "receipt.jpg",
        type: "image/jpeg",
      } as unknown as Blob);

      const response = await fetch(`${API_URL}/transactions/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = (await response
        .json()
        .catch(() => null)) as UploadResponse | null;

      if (!response.ok) {
        throw new Error("No se pudo subir el comprobante");
      }

      return data?.receiptUrl ?? data?.imageUrl;
    },
    [token],
  );

  const loadBalance = useCallback(async () => {
    if (!token) {
      return;
    }

    const data = await apiRequest<BalanceResponse>("/transactions/balance", {
      token,
    });

    setTotalIncome(data.totalIncome);
    setTotalExpense(data.totalExpense);
    setBalance(data.balance);
  }, [token]);

  const loadTransactions = useCallback(async () => {
    if (!token) {
      setTransactions([]);
      setTotalIncome(0);
      setTotalExpense(0);
      setBalance(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await apiRequest<Transaction[]>("/transactions", {
        token,
      });

      setTransactions(data);
      await loadBalance();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [loadBalance, token]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const createTransaction = async (input: TransactionInput) => {
    try {
      setError("");

      const receiptUrl = await uploadReceipt(input.photoUri);

      const newTransaction = await apiRequest<Transaction>("/transactions", {
        method: "POST",
        token,
        body: {
          amount: input.amount,
          type: input.type,
          description: input.description,
          date: new Date().toISOString(),
          categoryId: Number(input.categoryId),
          receiptUrl,
          latitude: input.location?.latitude,
          longitude: input.location?.longitude,
        },
      });

      setTransactions((current) => [...current, newTransaction]);
      await loadBalance();
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    }
  };

  const updateTransaction = async (id: string, input: TransactionInput) => {
    try {
      setError("");

      const receiptUrl = await uploadReceipt(input.photoUri);

      const updatedTransaction = await apiRequest<Transaction>(
        `/transactions/${id}`,
        {
          method: "PATCH",
          token,
          body: {
            amount: input.amount,
            type: input.type,
            description: input.description,
            date: new Date().toISOString(),
            categoryId: Number(input.categoryId),
            receiptUrl,
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
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      setError("");

      await apiRequest(`/transactions/${id}`, {
        method: "DELETE",
        token,
      });

      setTransactions((current) =>
        current.filter((transaction) => transaction.id !== Number(id)),
      );

      await loadBalance();
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    }
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
