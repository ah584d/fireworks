import React, {ReactElement} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Lottie from 'lottie-react-native';
import {SCREEN_HEIGHT} from '../../common/infra/infra.consts';

export const ListEmptyComponent = (): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Still no have expense</Text>
      </View>
      <Lottie
        style={{
          transform: [{scale: 0.8}],
          width: '100%',
          height: '100%',
        }}
        source={require('../../assets/lottie/hamster.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: SCREEN_HEIGHT / 1.7,
  },
  textWrapper: {
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 30,
    lineHeight: 30,
  },
});
