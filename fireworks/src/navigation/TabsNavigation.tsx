import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SVGHome from '../assets/svg/menu-home.svg';
import SVGProfile from '../assets/svg/menu-profile.svg';
import {mainColors} from '../common/themes/colors';
import {HomeScreen} from '../screens/HomeScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {navRootStackName} from './navigation.types';

const tabBarIcon = (focused: boolean, route: string): any => {
  // TODO avraham to fix
  let SvgNavIcon = focused ? <SVGHome /> : <SVGHome />;
  switch (route) {
    case navRootStackName.HOME_SCREEN:
      SvgNavIcon = focused ? <SVGHome /> : <SVGHome />;
      break;
    case navRootStackName.PROFILE_SCREEN:
      SvgNavIcon = focused ? <SVGProfile /> : <SVGProfile />;
      break;
    default:
      SvgNavIcon = focused ? <SVGHome /> : <SVGHome />;

      break;
  }
  return <View>{SvgNavIcon}</View>;
};

const Tab = createBottomTabNavigator();

export const TabsNavigation = (): React.ReactElement => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {},
        tabBarIcon: ({focused}) => tabBarIcon(focused, route?.name),
        tabBarActiveTintColor: mainColors.PRIMARY_DARK,
        tabBarInactiveTintColor: mainColors.GRAY_DARK,
      })}>
      <Tab.Screen name={navRootStackName.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen
        name={navRootStackName.PROFILE_SCREEN}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
