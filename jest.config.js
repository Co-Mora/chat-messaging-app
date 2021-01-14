module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    "transform": {
      "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    },
    "globals": {
      "ts-jest": {
        "babelConfig": true
      }
    },
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules/",
      "mediaFileTransformer",
      "mockModules",
      "react-native-deprecated-custom-components",
    ],
    "cacheDirectory": ".jest/cache",
    "moduleDirectories": [
      "node_modules"
    ],
    "collectCoverage": true,
    "collectCoverageFrom": [
      "app/**/*.ts",
      "!app/**/*.d.ts",
      "!app/**/*Sagas.ts",
      "!app/**/*Screens.ts",
    ],
    "globals": {
      "__DEV__": true,
      "__TEST__": true,
      "window": {}
    },
    transformIgnorePatterns: [
      'node_modules/(?!react-native|@react-native-community/async-storage)',
    ],
  };