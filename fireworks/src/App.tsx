import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {mainColors} from './common/themes/colors';
import {RootStackContainer} from './navigation/RootStack';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      {/* <SafeAreaView
        style={{flex: 0, backgroundColor: mainColors.GRAY_EXTRA_LIGHT}}
      />
      <SafeAreaView
        style={{flex: 1, backgroundColor: mainColors.GRAY_EXTRA_LIGHT}}> */}
        <NavigationContainer>
          <RootStackContainer />
        </NavigationContainer>
      {/* </SafeAreaView> */}
    </SafeAreaProvider>
  );
}

export default App;
