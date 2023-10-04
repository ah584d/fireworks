export enum navRootStackName {
  WELCOME_SCREEN = 'welcomeScreen',
  HOME_SCREEN = 'Home',
  PROFILE_SCREEN = 'Profile',
  TABS_STACK = 'tabsStack',
}

export type ScreenParams = {
  [navRootStackName.WELCOME_SCREEN]: never;
  [navRootStackName.HOME_SCREEN]: {userName: string};
  [navRootStackName.PROFILE_SCREEN]: {userName: string};
  [navRootStackName.TABS_STACK]: {userName: string};
};
