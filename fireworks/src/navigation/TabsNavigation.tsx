import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import SVGHome from '../assets/svg/menu-home.svg';
import SVGProfile from '../assets/svg/menu-profile.svg';
import {mainColors} from '../common/themes/colors';
import {HomeScreen} from '../screens/HomeScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {ScreenParams, navRootStackName} from './navigation.types';

const tabBarIcon = (focused: boolean, route: string): JSX.Element => {
  let SvgNavIcon = focused ? <SVGHome /> : <SVGHome />;

  switch (route) {
    case navRootStackName.HOME_SCREEN:
      SvgNavIcon = focused ? <SVGHome /> : <SVGHome />;
      break;
    case navRootStackName.PROFILE_SCREEN:
      SvgNavIcon = focused ? <SVGProfile /> : <SVGProfile />;
      break;
    default:
      break;
  }
  return <View>{SvgNavIcon}</View>;
};

const Tab = createBottomTabNavigator();

interface TabsNavigationProps {
  route?: RouteProp<ScreenParams, navRootStackName.TABS_STACK>;
}

export const TabsNavigation = ({route}: TabsNavigationProps): React.ReactElement => {
  const userName = route?.params?.userName;
  return (
    <Tab.Navigator
      screenOptions={({route: routeParam}) => ({
        headerShown: true,
        tabBarStyle: {},
        tabBarIcon: ({focused}) => tabBarIcon(focused, routeParam?.name),
        tabBarActiveTintColor: mainColors.PURPLE,
        tabBarInactiveTintColor: mainColors.GRAY_DARK,
      })}>
      <Tab.Screen name={navRootStackName.HOME_SCREEN} component={HomeScreen} initialParams={{userName}} options={{headerTitle: userName}} />
      <Tab.Screen name={navRootStackName.PROFILE_SCREEN} component={ProfileScreen} initialParams={{userName}} options={{headerTitle: userName}} />
    </Tab.Navigator>
  );
};
