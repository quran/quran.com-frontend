const threshold = {
  statements: 85,
  branches: 75,
  functions: 85,
  lines: 85,
};

module.exports = {
  moduleDirectories: ['node_modules', 'src', 'src/shared', 'tests'],
  // coverageReporters: ['lcov'],
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 80,
      functions: 85,
      lines: 85,
    },
    './src/components/**/*.{ts,tsx,js,jsx}': threshold,
    './src/containers/**/*.{ts,tsx,js,jsx}': threshold,
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  automock: false,
  setupFiles: ['./setupJest.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/tests/__mocks__/styleMock.js',
  },
  globals: {
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: false,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  clearMocks: true,
};
