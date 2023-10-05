export interface UserAccount {
  id: number;
  name: string;
  total: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: number;
  name: string | undefined;
  date: string | undefined;
  amount: number | undefined;
}