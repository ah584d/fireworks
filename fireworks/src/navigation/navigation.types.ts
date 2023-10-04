export enum navRootStackName {
  WELCOME_SCREEN = 'welcomeScreen',
  HOME_SCREEN = 'Home',
  PROFILE_SCREEN = 'Profile',
  TABS_STACK = 'tabsStack',
}

export type ScreenParams = {
  [navRootStackName.WELCOME_SCREEN]: undefined;
  [navRootStackName.HOME_SCREEN]: undefined;
  [navRootStackName.PROFILE_SCREEN]: undefined;
  [navRootStackName.TABS_STACK]: {userName: string};
};
