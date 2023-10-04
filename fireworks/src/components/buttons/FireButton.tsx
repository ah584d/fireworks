import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {mainColors} from '../../common/themes/colors';
import {Spacing} from '../../common/themes/spacing';

interface FireButtonProps {
  label: string;
  onPressedCB(): void;
  disabled?: boolean;
}

export const FireButton: FC<FireButtonProps> = ({label, onPressedCB, disabled = false}) => {
  return (
    <TouchableOpacity style={[styles.container, {opacity: disabled ? 0.5 : 1}]} onPress={onPressedCB} accessibilityRole={'button'} disabled={disabled} accessibilityLabel={label}>
      <View>
        <Text style={styles.textStyle}>{label}</Text>
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
