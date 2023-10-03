import {create} from 'zustand';
import {getRandomUUID} from '../common/utils/numbers.utils';
import {LocalStorage, Transaction, UserAccount} from './store.types';

export interface FireStoreType {
  accounts: UserAccount[];
  createAccount: (name: string) => void;
  addTransaction: (name: string, date: Date, amount: number) => void;
  editTransaction: (
    name: string,
    date: Date,
    amount: number,
    id: number,
  ) => void;
  deleteTransaction: (name: string, id: number) => void;
}

export const useFireStore = create<FireStoreType>(set => ({
  accounts: [] as unknown as LocalStorage,

  createAccount: (name: string) =>
    set((state: FireStoreType) => {
      const newState = [...state.accounts];
      newState.push({name, total: 0, transactions: []});
      return {
        accounts: newState,
      };
    }),

  addTransaction: (name: string, date: Date, amount: number) =>
    set((state: FireStoreType) => {
      const newState = [...state.accounts].map(account => {
        if (account.name === name) {
          account.transactions.push({date, amount, id: getRandomUUID()});
        }
        return account;
      });

      return {
        accounts: newState,
      };
    }),

  editTransaction: (name: string, date: Date, amount: number, id: number) =>
    set((state: FireStoreType) => {
      const newState = [...state.accounts].map(account => {
        if (account.name === name) {
          account.transactions = account.transactions.filter(
            (transaction: Transaction) => {
              if (transaction.id === id) {
                return {date, amount, id};
              }
            },
          );
        }
        return account;
      });

      return {
        accounts: newState,
      };
    }),

  deleteTransaction: (name: string, id: number) =>
    set((state: FireStoreType) => {
      const newState = [...state.accounts].map(account => {
        if (account.name === name) {
          account.transactions = account.transactions.filter(
            (transaction: Transaction) => transaction.id !== id,
          );
        }
        return account;
      });

      return {
        accounts: newState,
      };
    }),
  resetAccounts: () => set({accounts: []}),
}));
