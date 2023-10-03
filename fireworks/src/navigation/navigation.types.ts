export enum navRootStackName {
  WELCOME_SCREEN = 'welcomeScreen',
  HOME_SCREEN = 'Home',
  PROFILE_SCREEN = 'Profile',
  TABS_STACK = 'tabsStack',
}

export type ScreenParams = {
  [navRootStackName.WELCOME_SCREEN]: undefined;
  [navRootStackName.HOME_SCREEN]: {user: string};
  [navRootStackName.PROFILE_SCREEN]: {user: string};
  [navRootStackName.TABS_STACK]: undefined;
};
