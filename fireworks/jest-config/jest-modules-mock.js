jest.mock('../src/state/store', () => ({
  useFireStore: jest.fn(),
}));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
