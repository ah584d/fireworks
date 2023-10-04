import {Dimensions, Platform} from 'react-native';

export const IS_IOS = Platform.OS === 'ios';
export const OS_NAME = Platform.OS;

export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const SCREEN_WIDTH: number = Dimensions.get('window').width;

export const IS_SMALL_SCREEN: boolean = SCREEN_HEIGHT < 700;

export const FONT_SCALE = Dimensions.get('window').fontScale;

export const MAX_FONT_SIZE_MULTIPLIER = 2;
