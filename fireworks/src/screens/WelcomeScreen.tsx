import React, {ReactElement} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenParams, navRootStackName} from '../navigation/navigation.types';

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
  return (
    <View style={styles.container}>
      <Text>login</Text>
      <Button
        title="Go to Jane's profile"
        onPress={() => {
          navigation?.navigate(navRootStackName.TABS_STACK);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
