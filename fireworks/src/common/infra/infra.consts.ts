import {Dimensions, Platform} from 'react-native';

export const IS_IOS = Platform.OS === 'ios';

export const OS_NAME = Platform.OS;

export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const SCREEN_WIDTH: number = Dimensions.get('window').width;
