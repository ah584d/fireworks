import React, {FC, ReactElement} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {mainColors} from '../../common/themes/colors';
import {Spacing} from '../../common/themes/spacing';
import {dateToFormattedString} from '../../common/utils/date.utils';
import {AggregatedTransactions, Transaction} from '../../state/store.types';

interface TableProps {
  aggregatedTransactions: AggregatedTransactions[];
  longPressAction: (transaction: Transaction) => void;
}

export const Table: FC<TableProps> = ({aggregatedTransactions, longPressAction}) => {
  const renderItem = ({date, transactions}: AggregatedTransactions): ReactElement => (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.text}>{dateToFormattedString(date)}</Text>
      </View>
      <View>
        {transactions.map((item: Transaction, index: number) => (
          <TouchableOpacity onLongPress={() => longPressAction(item)} key={`${item.id}${item.name}${index}`}>
            <View style={[styles.wrapper, {borderBottomWidth: index !== transactions.length - 1 ? 1 : 0}]}>
              <Text style={styles.text}>{item.name}</Text>
              <View style={styles.amount}>
                <Text style={[styles.text, {paddingLeft: 0}]}>$ {item.amount}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return <FlatList style={styles.list} data={aggregatedTransactions} showsVerticalScrollIndicator={true} renderItem={({item}) => renderItem(item)} />;
};

const styles = StyleSheet.create({
  container: {
    //borderWidth: 1,
  },
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Spacing.s24,
    marginVertical: Spacing.s8,
    borderBottomColor: mainColors.GRAY_EXTRA_LIGHT,
  },
  dateContainer: {
    justifyContent: 'center',
    backgroundColor: mainColors.GRAY_LIGHT,
    marginVertical: Spacing.s12,
    height: Spacing.s24,
  },
  text: {
    flex: 0.8,
    //borderWidth: 1,
    paddingHorizontal: Spacing.s16,
    textAlignVertical: 'center',
  },
  amount: {
    flex: 0.2,
    //borderWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
  },
});
