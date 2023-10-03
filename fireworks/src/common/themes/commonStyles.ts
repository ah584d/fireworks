import {StyleProp, ViewStyle} from 'react-native';
import {mainColors} from './colors';

export const styleShadow: StyleProp<ViewStyle> = {
  shadowColor: mainColors.BLACK,
  shadowOffset: {width: 0, height: 3},
  shadowRadius: 5,
  shadowOpacity: 0.3,
  elevation: 1.5,
};
