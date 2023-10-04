import {create} from 'zustand';
import {getRandomUUID} from '../common/utils/numbers.utils';
import {deleteAccount, storeUser} from './persistantStorage';
import {Transaction, UserAccount} from './store.types';

export interface FireStoreType {
  account: UserAccount;
  setCurrentAccount: (userAccount: UserAccount) => void;
  createAccount: (name: string) => void;
  addTransaction: (userName: string, transaction: Transaction) => void;
  editTransaction: (userName: string, name: string, date: Date, amount: number, id: number) => void;
  deleteTransaction: (userName: string, id: number) => void;
  resetAccount:(userName: string) => void;
}

export const useFireStore = create<FireStoreType>(set => ({
  account: {} as unknown as UserAccount,

  setCurrentAccount: (userAccount: UserAccount) =>
    set(() => {
      return {
        account: userAccount,
      };
    }),

  createAccount: (name: string) =>
    set(() => {
      const newAccount = {id: getRandomUUID(), name, total: 0, transactions: []};
      storeUser(name, newAccount);

      return {
        account: newAccount,
      };
    }),

  addTransaction: (userName: string, {name, date, amount}: Transaction) =>
    set((state: FireStoreType) => {
      const updatedAccount = {...state.account};
      updatedAccount.transactions.push({name, date, amount, id: getRandomUUID()});
      updatedAccount.total = updatedAccount.total + (amount ?? 0);

      storeUser(userName, updatedAccount);

      return {
        account: updatedAccount,
      };
    }),

  editTransaction: (userName: string,name: string, date: Date, amount: number, id: number) =>
    set((state: FireStoreType) => {
      const updatedAccount = {...state.account};

      updatedAccount.transactions.filter((transaction: Transaction) => {
        if (transaction.id === id) {
          return {name, date, amount, id};
        } else {
          return transaction;
        }
      });

      storeUser(userName, updatedAccount);

      return {
        account: updatedAccount,
      };
    }),

  deleteTransaction: (userName: string, id: number) =>
    set((state: FireStoreType) => {
      const updatedAccount = {...state.account};

      updatedAccount.transactions.filter((transaction: Transaction) => transaction.id !== id);

      storeUser(userName, updatedAccount);

      return {
        account: updatedAccount,
      };
    }),

  resetAccount: (userName: string) =>
    set(() => {
      deleteAccount(userName);

      return {
        account: {} as UserAccount,
      };
    }),
}));
