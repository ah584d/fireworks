jest.mock('../src/state/store', () => ({
  useFireStore: jest.fn(),
}));
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(),
}));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
