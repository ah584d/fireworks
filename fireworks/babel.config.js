module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // https://github.com/facebook/react-native/issues/36794
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
],
};
