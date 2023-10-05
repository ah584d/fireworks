import React, {FC} from 'react';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import SVGClose from '../../assets/svg/cancel.svg';
import {mainColors} from '../../common/themes/colors';

interface CloseButtonProps {
  action(): void;
  customStyle?: StyleProp<ViewStyle>;
}

export const CLOSE_BUTTON_SIZE = 30;

export const CloseButton: FC<CloseButtonProps> = ({action, customStyle}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? mainColors.GRAY_LIGHT : undefined,
        },
        styles.button,
        customStyle,
      ]}
      onPress={action}>
      <View style={styles.viewButton}>
        <SVGClose />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    justifyContent: 'center',
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
  },
  viewButton: {
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
