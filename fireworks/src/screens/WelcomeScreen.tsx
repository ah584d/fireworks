import React, {ReactElement, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Spacing} from '../common/themes/spacing';
import {FireButton} from '../components/buttons/FireButton';
import {InputField} from '../components/inputField/InputField';
import {ScreenParams, navRootStackName} from '../navigation/navigation.types';
import {hasUserName, retrieveUserData} from '../state/persistentStorage';
import {useFireStore} from '../state/store';
import {UserAccount} from '../state/store.types';

interface WelcomeScreenProps {
  route?: RouteProp<ScreenParams, navRootStackName.WELCOME_SCREEN>;
  navigation?: NativeStackNavigationProp<ScreenParams, navRootStackName.WELCOME_SCREEN>;
}

export const WelcomeScreen = ({navigation}: WelcomeScreenProps): ReactElement => {
  const [userName, setUserName] = useState('');
  const {setCurrentAccount, createAccount} = useFireStore(state => state) ?? {};

  useFocusEffect(
    React.useCallback(() => {
      setUserName('');
    }, [])
  );

  const onSubmit = (): void => {
    if (hasUserName(userName)) {
      const userFromStorage = retrieveUserData<UserAccount>(userName);
      setCurrentAccount(userFromStorage);
    } else {
      createAccount(userName);
    }

    navigation?.navigate(navRootStackName.TABS_STACK, {userName});
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <InputField
          onTextChanged={value => {
            setUserName(value);
          }}
          value={userName}
          textHint={'Enter Name'}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <FireButton label="Submit" onPressed={onSubmit} disabled={userName?.length === 0} />
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
