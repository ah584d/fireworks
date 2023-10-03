import React, {FC} from 'react';
import {RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WelcomeScreen} from '../screens/WelcomeScreen';
import {TabsNavigation} from './TabsNavigation';
import {ScreenParams, navRootStackName} from './navigation.types';

interface RootTabStackContainerProps {
  route?: RouteProp<ScreenParams, navRootStackName.WELCOME_SCREEN>;
}

const RootStack = createNativeStackNavigator<ScreenParams>();

export const RootStackContainer: FC<RootTabStackContainerProps> = () => (
  <RootStack.Navigator
    initialRouteName={navRootStackName.WELCOME_SCREEN}
    screenOptions={{
      headerShown: false,
    }}>
    <RootStack.Screen
      name={navRootStackName.WELCOME_SCREEN}
      component={WelcomeScreen}
    />
    <RootStack.Screen
      name={navRootStackName.TABS_STACK}
      component={TabsNavigation}
    />
  </RootStack.Navigator>
);
