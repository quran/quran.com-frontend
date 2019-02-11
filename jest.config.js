const threshold = {
  statements: 50,
  branches: 50,
  functions: 50,
  lines: 50,
};

module.exports = {
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
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  clearMocks: true,
};
