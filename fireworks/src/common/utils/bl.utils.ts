import {AggregatedTransactions, Transaction, UserAccount} from '../../state/store.types';

export const getMyAccount = (accounts: UserAccount[], name: string | undefined): UserAccount => accounts.filter((account: UserAccount) => account.name === name)?.[0];

export const isTransactionComplete = (transaction?: Transaction): boolean => !!transaction?.name && !!transaction?.date && !!transaction?.amount;

export const getAggregatedDate = (transactions: Transaction[]): AggregatedTransactions[] => {
  const aggregatedTransactions: Record<string, AggregatedTransactions> = {};

  // Iterate through the transactions and group them by date
  transactions.forEach(transaction => {
    const dateKey = transaction.date ?? new Date().toDateString();
    if (!aggregatedTransactions[dateKey]) {
      aggregatedTransactions[dateKey] = {
        date: dateKey,
        transactions: [],
      };
    }
    aggregatedTransactions[dateKey].transactions.push(transaction);
  });

  // Convert the Map values to an array of AggregatedTransactions
  const aggregatedTransactionsArr: AggregatedTransactions[] = Object.values(aggregatedTransactions);

  // Sort the aggregated transactions by date (ascending order)
  aggregatedTransactionsArr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return aggregatedTransactionsArr;
};
