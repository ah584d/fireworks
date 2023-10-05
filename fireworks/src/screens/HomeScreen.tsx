import React, {ReactElement} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {mainColors} from '../common/themes/colors';
import {Spacing} from '../common/themes/spacing';
import {getAggregatedDate} from '../common/utils/bl.utils';
import {FireButton} from '../components/buttons/FireButton';
// import {FloatingButton} from '../components/buttons/FloatingButton';
import {ModalWrapper} from '../components/modal/ModalWrapper';
import {Table} from '../components/table/Table';
import {ScreenParams, navRootStackName} from '../navigation/navigation.types';
import {useFireStore} from '../state/store';
import {Transaction} from '../state/store.types';

interface HomeScreenProps {
  route?: RouteProp<ScreenParams, navRootStackName.HOME_SCREEN>;
  navigation?: NativeStackNavigationProp<ScreenParams, navRootStackName.HOME_SCREEN>;
}

export const HomeScreen = ({}: HomeScreenProps): ReactElement => {
  const {account, openModal, setTransactionToEdit} = useFireStore(state => state) ?? {};

  const aggregatedData = getAggregatedDate(account.transactions);

  //console.log(`====> DEBUG account: `, account, JSON.stringify(aggregatedData, null, 2));

  const onLongPressCB = (transaction: Transaction): void => {
    setTransactionToEdit(transaction);
    openModal();
  };

  const renderTop = (): ReactElement => (
    <View style={styles.topWrapper}>
      <View style={styles.totalWrapper}>
        <Text>
          <Text style={styles.labelTotal}>Total Expenses: </Text>
          <Text style={styles.labelAmount}>$ {account.total ?? 0}</Text>
        </Text>
      </View>
      <View style={styles.filtersWrapper}>
        <FireButton label="Filters" onPressed={() => undefined} customStyle={{backgroundColor: mainColors.GRAY_EXTRA_LIGHT, borderColor: mainColors.GRAY}} labelCustomStyle={{color: undefined}} />
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
    //borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.s32,
  },
  topWrapper: {
    width: '100%',
    //borderWidth: 1,
    paddingHorizontal: Spacing.gutter,
    marginBottom: Spacing.s32,
  },
  totalWrapper: {
    width: '100%',
    //borderWidth: 1,
    alignItems: 'flex-start',
    marginBottom: Spacing.s24,
  },
  filtersWrapper: {
    width: '100%',
    //borderWidth: 1,
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
