export type TransactionType = "income" | "expense";

export interface TransactionLocation {
  latitude: number;
  longitude: number;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  description: string;
  date: string;
  categoryId: string;
  photoUri?: string;
  location?: TransactionLocation;
}
