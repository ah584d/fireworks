import React, {ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomTabBar, BottomTabBarProps} from '@react-navigation/bottom-tabs';

export const BottomBarWrapper = (props: BottomTabBarProps): ReactElement => (
  <View style={styles.navigatorContainer}>
    <BottomTabBar {...props} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    // SHADOW
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
