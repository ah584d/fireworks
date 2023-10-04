import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Spacing} from '../../common/themes/spacing';
import {isTransactionComplete} from '../../common/utils/bl.utils';
import {Transaction} from '../../state/store.types';
import {TransactionType} from '../../types/common.types';
import {FireButton} from '../buttons/FireButton';
import {InputField} from '../inputField/InputField';

interface ExpenseProps {
  onButtonPressed: (expense: Transaction) => void;
  transactionType: TransactionType;
  transaction?: Transaction;
}

export const Expense: FC<ExpenseProps> = ({onButtonPressed, transaction, transactionType}) => {
  const [expense, setExpense] = useState<Transaction>({} as Transaction);

  const {name, amount, date} = transaction ?? {};

  console.log(`====> DEBUG isTransactionComplete: `, isTransactionComplete(expense));

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Create Expense</Text>
        <InputField onTextChanged={value => setExpense(previous => ({...previous, name: value}))} value={name} textHint={'Title'} />
        <InputField onTextChanged={value => setExpense(previous => ({...previous, amount: +value}))} value={amount?.toString()} textHint={'Amount'} />
        <InputField onTextChanged={value => setExpense(previous => ({...previous, date: new Date(value)}))} value={date?.toDateString()} textHint={'Date'} />
      </View>
      {/* disabled={!isTransactionComplete(expense)} */}
      <FireButton label={transactionType === 'adding' ? 'Create' : 'Save'} onPressed={() => onButtonPressed(expense)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.s32,
    marginBottom: Spacing.s40,
    marginHorizontal: Spacing.gutter,
  },
  title: {
    marginBottom: Spacing.s32,
    fontWeight: '500',
    fontSize: 20,
  },
  form: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flex: 0.5,
  },
});
