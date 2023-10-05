import React, {FC, ReactElement} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {mainColors} from '../../common/themes/colors';
import {Spacing} from '../../common/themes/spacing';
import {AggregatedTransactions, Transaction} from '../../state/store.types';

interface TableProps {
  aggregatedTransactions: AggregatedTransactions[];
  longPressAction: (transaction: Transaction) => void;
}

export const Table: FC<TableProps> = ({aggregatedTransactions, longPressAction}) => {
  const renderItem = ({date, transactions}: AggregatedTransactions): ReactElement => (
    <View style={styles.rowContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <View>
        {transactions.map((item: Transaction, index: number) => (
          <TouchableOpacity onLongPress={() => longPressAction(item)} key={`${item.id}${item.name}${index}`}>
            <View style={[styles.expenseWrapper, {borderBottomWidth: index !== transactions.length - 1 ? 1 : 0}]}>
              <Text style={styles.text}>{item.name}</Text>
              <View style={styles.amountWrapper}>
                <Text style={[styles.amountText, {paddingLeft: 0}]}>$ {item.amount}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={aggregatedTransactions}
      showsVerticalScrollIndicator={true}
      renderItem={({item}) => renderItem(item)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  rowContainer: {
    //borderWidth: 1,
  },
  dateContainer: {
    justifyContent: 'center',
    backgroundColor: mainColors.GRAY_EXTRA_LIGHT,
    height: Spacing.s32,
  },
  dateText: {
    paddingHorizontal: Spacing.s16,
  },
  expenseWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Spacing.s48,
    borderBottomColor: mainColors.GRAY_EXTRA_LIGHT,
  },
  text: {
    flex: 0.8,
    paddingHorizontal: Spacing.s16,
    textAlignVertical: 'center',
  },
  amountWrapper: {
    flex: 0.15,
  },
  amountText: {
    textAlignVertical: 'center',
  },
});
