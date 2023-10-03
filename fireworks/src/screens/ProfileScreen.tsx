import React, {ReactElement} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenParams, navRootStackName} from '../navigation/navigation.types';

interface ProfileScreenProps {
  route?: RouteProp<ScreenParams, navRootStackName.PROFILE_SCREEN>;
  navigation?: NativeStackNavigationProp<
    ScreenParams,
    navRootStackName.WELCOME_SCREEN
  >;
}

export const ProfileScreen = ({
  navigation,
}: ProfileScreenProps): ReactElement => {
  return (
    <View style={styles.container}>
      <Text>profile</Text>
      {/* <Button
        title="profile"
        onPress={() => {
          navigation?.navigate(navRootStackName.HOME_SCREEN, {
            user: 'robert',
          });
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
