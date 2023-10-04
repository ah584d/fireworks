import React, {FC} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {mainColors} from '../../common/themes/colors';
import {Spacing} from '../../common/themes/spacing';

interface FireButtonProps {
  label: string;
  onPressed(): void;
  disabled?: boolean;
  customStyle?: StyleProp<ViewStyle>;
  labelCustomStyle?: StyleProp<TextStyle>;
}

export const FireButton: FC<FireButtonProps> = ({label, onPressed, disabled = false, customStyle, labelCustomStyle}) => {
  return (
    <TouchableOpacity style={[styles.container, {opacity: disabled ? 0.5 : 1}, customStyle]} onPress={onPressed} accessibilityRole={'button'} disabled={disabled} accessibilityLabel={label}>
      <View>
        <Text style={[styles.textStyle, labelCustomStyle]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: mainColors.PURPLE,
    borderWidth: 1,
    borderColor: mainColors.BLUE,
    height: Spacing.s40,
    width: 120,
    borderRadius: Spacing.borderRadius,
  },
  textStyle: {
    alignSelf: 'center',
    color: mainColors.WHITE,
  },
  buttonLabel: {
    textAlign: 'center',
    marginHorizontal: Spacing.s8,
  },
});
