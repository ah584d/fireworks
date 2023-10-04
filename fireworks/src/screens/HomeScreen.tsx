import React, {ReactElement, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SCREEN_HEIGHT} from '../common/infra/infra.consts';
import {Spacing} from '../common/themes/spacing';
import {getMyAccount} from '../common/utils/bl.utils';
import {FireButton} from '../components/buttons/FireButton';
import {Expense} from '../components/modal/Expense';
import {ScreenParams, navRootStackName} from '../navigation/navigation.types';
import {useFireStore} from '../state/store';
import {Transaction} from '../state/store.types';

interface HomeScreenProps {
  route?: RouteProp<ScreenParams, navRootStackName.HOME_SCREEN>;
  navigation?: NativeStackNavigationProp<ScreenParams, navRootStackName.HOME_SCREEN>;
}

export const HomeScreen = ({route}: HomeScreenProps): ReactElement => {
  const {accounts, addTransaction} = useFireStore(state => state) ?? {};
  const userNameParam = route?.params?.userName;
  const refRBSheet = useRef<RBSheet | null>(null);

  const myAccount = getMyAccount(accounts, userNameParam);

  const openModal = (): void => {
    refRBSheet.current?.open();
  };

  const onButtonPressedCB = (transaction: Transaction): void => {
    console.log(`====> DEBUG transaction: `, transaction);
    addTransaction(transaction);
  };

  const renderTotal = (): ReactElement => (
    <View style={styles.totalWrapper}>
      <Text>
        <Text style={styles.labelTotal}>Total Expenses: </Text>
        <Text style={styles.labelAmount}>${myAccount.total}</Text>
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderTotal()}
      <RBSheet
        ref={refRBSheet}
        height={SCREEN_HEIGHT * 0.92}
        closeOnDragDown
        closeOnPressMask={false}
        keyboardAvoidingViewEnabled
        customStyles={{
          wrapper: {
            //backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <Expense transactionType="adding" onButtonPressed={onButtonPressedCB} />
      </RBSheet>

      <FireButton label="+" onPressedCB={openModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    marginHorizontal: Spacing.gutter,
  },
  totalWrapper: {
    width: '100%',
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  labelTotal: {
    fontWeight: '700',
    fontSize: 24,
  },
  labelAmount: {
    fontSize: 20,
  },
  total: {},
});
