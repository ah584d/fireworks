import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import SVGHomeSelected from '../assets/svg/menu-home-selected.svg';
import SVGHome from '../assets/svg/menu-home.svg';
import SVGProfileSelected from '../assets/svg/menu-profile-selected.svg';
import SVGProfile from '../assets/svg/menu-profile.svg';
import {mainColors} from '../common/themes/colors';
import {BottomBarWrapper} from '../components/bottomBarWrapper/BottomBarWrapper';
import {TabBarAdvancedButton} from '../components/buttons/TabBarAdvancedButton';
import {ModalWrapper} from '../components/modal/ModalWrapper';
import {HomeScreen} from '../screens/HomeScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {useFireStore} from '../state/store';
import {ScreenParams, navRootStackName} from './navigation.types';

const tabBarIcon = (focused: boolean, route: string): JSX.Element => {
  let SvgNavIcon = focused ? <SVGHomeSelected /> : <SVGHome />;

  switch (route) {
    case navRootStackName.HOME_SCREEN:
      SvgNavIcon = focused ? <SVGHomeSelected /> : <SVGHome />;
      break;
    case navRootStackName.PROFILE_SCREEN:
      SvgNavIcon = focused ? <SVGProfileSelected /> : <SVGProfile />;
      break;
    default:
      break;
  }
  return <View>{SvgNavIcon}</View>;
};

const BottomBar = createBottomTabNavigator();

interface TabsNavigationProps {
  route?: RouteProp<ScreenParams, navRootStackName.TABS_STACK>;
}

export const TabsNavigation = ({route}: TabsNavigationProps): React.ReactElement => {
  const userName = route?.params?.userName;
  const {openModal} = useFireStore(state => state) ?? {};

  return (
    <BottomBar.Navigator
      screenOptions={({route: routeParam}) => ({
        headerShown: true,
        headerStyle: {backgroundColor: mainColors.WHITE},
        tabBarStyle: {},
        tabBarIcon: ({focused}) => tabBarIcon(focused, routeParam?.name),
        tabBarActiveTintColor: mainColors.BLUE,
        tabBarInactiveTintColor: mainColors.GRAY_DARK,
      })}
      tabBar={BottomBarWrapper}>
      <BottomBar.Screen name={navRootStackName.HOME_SCREEN} component={HomeScreen} options={{headerTitle: userName}} />
      <BottomBar.Screen
        name={navRootStackName.TAB_BUTTON_PLUS}
        component={HomeScreen}
        options={{
          tabBarButton: () => <TabBarAdvancedButton onButtonPressed={openModal} />,
        }}
      />

      <BottomBar.Screen name={navRootStackName.PROFILE_SCREEN} component={ProfileScreen} options={{headerTitle: userName}} />
    </BottomBar.Navigator>
  );
};
