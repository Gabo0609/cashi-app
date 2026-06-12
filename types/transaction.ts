export type TransactionType = "income" | "expense";

export interface TransactionLocation {
  latitude: number;
  longitude: number;
}

export interface Transaction {
  id: number;
  amount: number;
  type: TransactionType;
  description: string;
  date: string;
  categoryId: number;
  userId?: number;
  receiptUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  category?: {
    id: number;
    name: string;
  };
}
