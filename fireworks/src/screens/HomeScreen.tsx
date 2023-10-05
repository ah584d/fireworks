import React, {ReactElement} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SVGSearch from '../assets/svg/search.svg';
import {mainColors} from '../common/themes/colors';
import {Spacing} from '../common/themes/spacing';
import {getAggregatedDate} from '../common/utils/businessLogic.utils';
import {addDecimalMark} from '../common/utils/number.utils';
import {FireButton} from '../components/buttons/FireButton';
import {ModalWrapper} from '../components/modal/ModalWrapper';
import {Table} from '../components/table/Table';
import {ScreenParams, navRootStackName} from '../navigation/navigation.types';
import {useFireStore} from '../state/store';
import {Transaction} from '../types/store.types';

interface HomeScreenProps {
  route?: RouteProp<ScreenParams, navRootStackName.HOME_SCREEN>;
  navigation?: NativeStackNavigationProp<ScreenParams, navRootStackName.HOME_SCREEN>;
}

export const HomeScreen = ({}: HomeScreenProps): ReactElement => {
  const {account, openModal, setTransactionToEdit, setTransactionType, filteredTransactions, resetFilters} =
    useFireStore(state => state) ?? {};

  const isFiltersActive = filteredTransactions.length > 0;

  const aggregatedData = getAggregatedDate(isFiltersActive ? filteredTransactions : account.transactions);

  const onLongPressCB = (transaction: Transaction): void => {
    setTransactionToEdit(transaction);
    setTransactionType('editing');
    openModal();
  };

  const onFilterButtonPressed = (): void => {
    if (isFiltersActive) {
      resetFilters();
    } else {
      setTransactionType('filter');
      openModal();
    }
  };

  const filterButtonLabel = isFiltersActive ? 'Reset' : 'Filters';

  const renderTop = (): ReactElement => (
    <View style={styles.topWrapper}>
      <View style={styles.totalWrapper}>
        <Text>
          <Text style={styles.labelTotal}>Total Expenses: </Text>
          <Text style={styles.labelAmount}>$ {addDecimalMark(account.total ?? 0)}</Text>
        </Text>
      </View>
      <View style={styles.filtersWrapper}>
        <FireButton
          label={filterButtonLabel}
          onPressed={onFilterButtonPressed}
          customStyle={{
            backgroundColor: mainColors.GRAY_EXTRA_LIGHT,
            borderColor: isFiltersActive ? mainColors.RED : mainColors.GRAY,
          }}
          labelCustomStyle={{color: undefined}}
          leftIcon={<SVGSearch />}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderTop()}
      <ModalWrapper />
      <Table aggregatedTransactions={aggregatedData} longPressAction={onLongPressCB} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.s32,
  },
  topWrapper: {
    width: '100%',
    paddingHorizontal: Spacing.gutter,
    marginBottom: Spacing.s8,
  },
  totalWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: Spacing.s24,
  },
  filtersWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: Spacing.s24,
  },
  labelTotal: {
    fontWeight: '700',
    fontSize: 24,
  },
  labelAmount: {
    fontSize: 20,
  },
});
