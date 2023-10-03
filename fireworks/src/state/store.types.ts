export type LocalStorage = UserAccount[];
export interface UserAccount {
  name: string;
  total: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: number;
  date: Date;
  amount: number;
}
