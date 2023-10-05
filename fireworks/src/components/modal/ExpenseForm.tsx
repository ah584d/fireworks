import React, {FC, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {mainColors} from '../../common/themes/colors';
import {Spacing} from '../../common/themes/spacing';
import {TransactionType} from '../../types/common.types';
import {Transaction} from '../../types/store.types';
import {FireButton} from '../buttons/FireButton';

interface ExpenseProps {
  onButtonPressed: (expense: Transaction) => void;
  onDeleteButtonPressed: (transactionId: number) => void;
  transactionType: TransactionType;
  transaction?: Transaction;
}

export const Expense: FC<ExpenseProps> = ({onButtonPressed, onDeleteButtonPressed, transaction, transactionType}) => {
  const [expense, setExpense] = useState<Transaction>(transaction ?? ({} as Transaction));
  const [isDatePickerOpened, setIsDatePickerOpened] = useState(false);

  const {name, amount, date} = expense ?? {};

  const titleLabel =
    transactionType === 'adding' || !transactionType
      ? 'Create Expense'
      : transactionType === 'filter'
      ? 'Filters'
      : 'Edit Expense';
  const buttonLabel =
    transactionType === 'adding' || !transactionType ? 'Create' : transactionType === 'filter' ? 'Filter' : 'Save';

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>{titleLabel}</Text>
        <View style={styles.formRow}>
          <TextInput
            editable
            onChangeText={(updatedValue: string) => setExpense(previous => ({...previous, name: updatedValue}))}
            placeholder={'Title'}
            keyboardType={'default'}
            value={name}
          />
        </View>
        <View style={styles.formRow}>
          <TextInput
            editable
            onChangeText={(updatedValue: string) => setExpense(previous => ({...previous, amount: +updatedValue}))}
            placeholder={'Amount'}
            value={amount?.toString()}
            keyboardType={'decimal-pad'}
          />
        </View>
        <View style={styles.formRow}>
          <TextInput
            editable
            onPressIn={() => setIsDatePickerOpened(true)}
            placeholder={'Date'}
            keyboardType={'default'}
            value={date}
          />
        </View>
      </View>
      <View style={styles.buttonsGroup}>
        {transactionType === 'editing' && (
          <FireButton
            label={'Delete'}
            onPressed={() => onDeleteButtonPressed(expense.id)}
            customStyle={{backgroundColor: mainColors.RED}}
          />
        )}
        <FireButton label={buttonLabel} onPressed={() => onButtonPressed(expense as Transaction)} />
      </View>
      <DatePicker
        modal
        mode={'date'}
        open={isDatePickerOpened}
        date={new Date()}
        onConfirm={dateSelected => {
          setExpense(previous => ({...previous, date: dateSelected.toDateString()}));
          setIsDatePickerOpened(false);
        }}
        onCancel={() => {
          setIsDatePickerOpened(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonsGroup: {
    justifyContent: 'space-between',
    flex: 0.15,
  },
});
