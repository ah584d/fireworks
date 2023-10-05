import React, {ReactElement} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {mainColors} from '../common/themes/colors';
import {Spacing} from '../common/themes/spacing';
import {FireButton} from '../components/buttons/FireButton';
import {ModalWrapper} from '../components/modal/ModalWrapper';
import {ScreenParams, navRootStackName} from '../navigation/navigation.types';
import {useFireStore} from '../state/store';

interface ProfileScreenProps {
  route?: RouteProp<ScreenParams, navRootStackName.PROFILE_SCREEN>;
  navigation?: NativeStackNavigationProp<ScreenParams, navRootStackName.WELCOME_SCREEN>;
}

export const ProfileScreen = ({navigation}: ProfileScreenProps): ReactElement => {
  const {account, resetAccount} = useFireStore(state => state) ?? {};

  const onPressedCB = (): void => {
    resetAccount(account.name);
    navigation?.navigate(navRootStackName.WELCOME_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>Total Expenses Item(s)</Text>
        <Text style={styles.amount}>{account.transactions?.length}</Text>
      </View>
      <View style={styles.wrapper}>
        <FireButton
          label="Sign Out"
          onPressed={onPressedCB}
          customStyle={styles.buttonCustomStyle}
          labelCustomStyle={{color: undefined}}
        />
      </View>
      <ModalWrapper />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: Spacing.gutter,
  },
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    height: Spacing.s64,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.s40,
    borderBottomWidth: 1,
    borderColor: mainColors.GRAY_LIGHT,
  },
  label: {
    fontWeight: '400',
    fontSize: 20,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
  },
  buttonCustomStyle: {
    backgroundColor: mainColors.WHITE,
  },
});
