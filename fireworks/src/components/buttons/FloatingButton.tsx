import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SCREEN_WIDTH} from '../../common/infra/infra.consts';
import {mainColors} from '../../common/themes/colors';
import {Spacing} from '../../common/themes/spacing';

interface FireButtonProps {
  label: string;
  onPressed(): void;
}

export const FloatingButton: FC<FireButtonProps> = ({label, onPressed}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressed} accessibilityRole={'button'} accessibilityLabel={label}>
      <View style={styles.symbol}>
        <Text style={styles.textStyle}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    left: SCREEN_WIDTH / 2 - Spacing.s40,
    bottom: -10,
    zIndex: 10000,

    backgroundColor: mainColors.PURPLE,
    borderWidth: 1,
    borderColor: mainColors.BLUE,
    height: Spacing.s40,
    width: Spacing.s40,
    borderRadius: 50,
  },
  symbol: {
    justifyContent: 'center',
    alignItems: 'center',

    // borderWidth: 1,
  },
  textStyle: {
    color: mainColors.WHITE,
    fontWeight: '700',
    fontSize: 25,
    lineHeight: 27,
  },
  buttonLabel: {
    textAlign: 'center',
    marginHorizontal: Spacing.s8,
  },
});
