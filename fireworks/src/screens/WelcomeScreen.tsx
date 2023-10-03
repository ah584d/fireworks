import React, {ReactElement, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Spacing} from '../common/themes/spacing';
import {FireButton} from '../components/buttons/FireButton';
import {InputField} from '../components/inputField/InputField';
import {ScreenParams, navRootStackName} from '../navigation/navigation.types';
import {useFireStore} from '../state/store';
import {UserAccount} from '../state/store.types';

interface WelcomeScreenProps {
  route?: RouteProp<ScreenParams, navRootStackName.WELCOME_SCREEN>;
  navigation?: NativeStackNavigationProp<
    ScreenParams,
    navRootStackName.WELCOME_SCREEN
  >;
}

export const WelcomeScreen = ({
  navigation,
}: WelcomeScreenProps): ReactElement => {
  const [userName, setUserName] = useState('');
  const {accounts, createAccount} = useFireStore(state => state) ?? {};

  const onSubmit = (): void => {
    const isAccountExisting = accounts.filter(
      (account: UserAccount) => account.name === userName,
    );
    if (isAccountExisting.length === 0) {
      createAccount(userName);
    }

    navigation?.navigate(navRootStackName.TABS_STACK, {userName});
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <InputField
          onTextChanged={value => {
            console.log(value);
            setUserName(value);
          }}
          value={userName}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <FireButton
          label="Submit"
          onPressedCB={onSubmit}
          disabled={userName?.length === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.s48,
  },
  contentWrapper: {
    justifyContent: 'flex-end',
    width: '100%',
    flex: 0.5,
  },
  buttonWrapper: {
    flex: 0.1,
  },
});
