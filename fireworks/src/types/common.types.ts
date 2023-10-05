import {Transaction} from './store.types';

export type TransactionType = 'adding' | 'editing' | 'filter';

export interface AggregatedTransactions {
  date: string;
  transactions: Transaction[];
}
