import React, {ReactElement} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenParams, navRootStackName} from '../navigation/navigation.types';

interface ProfileScreenProps {
  route?: RouteProp<ScreenParams, navRootStackName.PROFILE_SCREEN>;
  navigation?: NativeStackNavigationProp<
    ScreenParams,
    navRootStackName.WELCOME_SCREEN
  >;
}

export const ProfileScreen = (): ReactElement => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>profile</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
