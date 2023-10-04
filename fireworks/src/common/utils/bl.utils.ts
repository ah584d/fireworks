import {Transaction, UserAccount} from '../../state/store.types';

export const getMyAccount = (accounts: UserAccount[], name: string | undefined): UserAccount => accounts.filter((account: UserAccount) => account.name === name)?.[0];

export const isTransactionComplete = (transaction?: Transaction): boolean => !!transaction?.name && !!transaction?.date && !!transaction?.amount;
