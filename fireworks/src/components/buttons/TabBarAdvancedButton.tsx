import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import SVGPlus from '../../assets/svg/plus.svg';
import { mainColors } from '../../common/themes/colors';

interface TabBarAdvancedButtonProps {
  onButtonPressed(): void;
}

export const TabBarAdvancedButton: FC<TabBarAdvancedButtonProps> = ({onButtonPressed}) => (
  <View style={styles.container} pointerEvents="box-none">
    <TouchableOpacity style={styles.button} onPress={onButtonPressed}>
      <SVGPlus />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 75,
    alignItems: 'center',
  },
  button: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 27,
    backgroundColor: mainColors.PURPLE,
  },
  buttonIcon: {
    fontSize: 16,
    color: '#F6F7EB',
  },
});
