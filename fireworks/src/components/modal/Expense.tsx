import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {mainColors} from '../../common/themes/colors';
import {Spacing} from '../../common/themes/spacing';
import {stringToDateString} from '../../common/utils/date.utils';
import {Transaction} from '../../state/store.types';
import {TransactionType} from '../../types/common.types';
import {FireButton} from '../buttons/FireButton';

interface ExpenseProps {
  onButtonPressed: (expense: Transaction) => void;
  transactionType: TransactionType;
  transaction?: Transaction;
}

export const Expense: FC<ExpenseProps> = ({onButtonPressed, transaction, transactionType}) => {
  const [expense, setExpense] = useState<Transaction>({} as Transaction);

  const {name, amount, date} = transaction ?? {};
  useEffect(() => {
    setExpense(previous => ({...previous, date: new Date().toDateString()}));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Create Expense</Text>
        <View style={styles.formRow}>
          <TextInput style={{}} editable onChangeText={(updatedValue: string) => setExpense(previous => ({...previous, name: updatedValue}))} placeholder={'Title'} keyboardType={'default'} value={name} />
        </View>
        <View style={styles.formRow}>
          <TextInput style={{}} editable onChangeText={(updatedValue: string) => setExpense(previous => ({...previous, amount: +updatedValue}))} placeholder={'Amount'} keyboardType={'default'} value={amount?.toString()} />
        </View>
        <View style={styles.formRow}>
          <TextInput style={{}} editable onChangeText={(updatedValue: string) => setExpense(previous => ({...previous, date: stringToDateString(updatedValue)}))} placeholder={'Date'} keyboardType={'default'} value={date} />
        </View>
      </View>
      <FireButton label={transactionType === 'adding' ? 'Create' : 'Save'} onPressed={() => onButtonPressed(expense)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //borderWidth: 1,
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
    //borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flex: 0.5,
  },
  formRow: {
    paddingVertical: Spacing.s12,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: mainColors.GRAY_EXTRA_LIGHT,
  },
});
