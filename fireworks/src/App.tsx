import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStackContainer} from './navigation/RootStack';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStackContainer />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
