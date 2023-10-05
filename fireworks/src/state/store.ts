import {create} from 'zustand';
import {getRandomUUID} from '../common/utils/numbers.utils';
import {TransactionType} from '../types/common.types';
import {Transaction, UserAccount} from '../types/store.types';
import {deleteAccount, storeUser} from './persistentStorage';

export interface FireStoreType {
  isModalOpened: boolean;
  account: UserAccount;
  transactionToEdit: Transaction | undefined;
  transactionType: TransactionType;
  filteredTransactions: Transaction[];
  setCurrentAccount: (userAccount: UserAccount) => void;
  createAccount: (name: string) => void;
  addTransaction: (userName: string, transaction: Transaction) => void;
  editTransaction: (userName: string, transaction: Transaction) => void;
  deleteTransaction: (userName: string, id: number) => void;
  resetAccount: (userName: string) => void;
  openModal: () => void;
  closeModal: () => void;
  setTransactionToEdit: (transaction: Transaction | undefined) => void;
  setTransactionType: (transactionType: TransactionType | undefined) => void;
  filterTransactions: (transaction: Transaction) => void;
  resetFilters: () => void;
}

export const useFireStore = create<FireStoreType>(set => ({
  account: {} as unknown as UserAccount,
  isModalOpened: false,
  transactionToEdit: undefined,
  transactionType: 'adding',
  filteredTransactions: [] as Transaction[],
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

  editTransaction: (userName: string, {id, name, date, amount}: Transaction) =>
    set((state: FireStoreType) => {
      const updatedTransactions = state.account.transactions.map((transactionItem: Transaction) => {
        if (transactionItem.id === id) {
          return {...transactionItem, name: name, date: date, amount: amount};
        } else {
          return transactionItem;
        }
      });
      const updatedAccount = {...state.account, transactions: updatedTransactions};

      storeUser(userName, updatedAccount);

      return {
        account: updatedAccount,
      };
    }),

  deleteTransaction: (userName: string, id: number) =>
    set((state: FireStoreType) => {
      const updatedTransactions = state.account.transactions.filter(
        (transaction: Transaction) => transaction.id !== id
      );

      const updatedAccount = {...state.account, transactions: updatedTransactions};
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

  openModal: () =>
    set(() => ({
      isModalOpened: true,
    })),

  closeModal: () =>
    set(() => ({
      isModalOpened: false,
    })),

  setTransactionToEdit: (transaction: Transaction | undefined) =>
    set(() => {
      return {
        transactionToEdit: transaction,
      };
    }),

  setTransactionType: (transactionType: TransactionType | undefined) =>
    set(() => {
      return {
        transactionType: transactionType,
      };
    }),
  filterTransactions: ({name, date, amount}: Transaction) =>
    set((state: FireStoreType) => {
      const filteredTransactions = state.account.transactions.filter((transactionItem: Transaction) => {
        if (transactionItem.name === name || transactionItem.date === date || transactionItem.amount === amount) {
          return transactionItem;
        }
      });

      return {
        filteredTransactions: filteredTransactions,
      };
    }),
  resetFilters: () =>
    set(() => {
      return {
        filteredTransactions: [],
      };
    }),
}));
