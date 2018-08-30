module.exports = {
  parser: 'babel-eslint',

  extends: ['airbnb'],

  plugins: ['import', 'react', 'babel', 'promise', 'jsx-a11y'],

  globals: {
    __DEV__: true,
  },

  env: {
    browser: true,
    jest: true,
    node: true,
  },

  // TODO: Once eslint supports overrides reaching into parent directories, we can use it:
  // overrides: [],

  settings: {
    'import/ignore': ['node_modules', '\\.json$'],
  },

  rules: {
    // Support tools specific
    'class-methods-use-this': 'off',
    'global-require': 'off',
    'no-magic-numbers': 'off',
    'no-prototype-builtins': 'off',
    'no-restricted-imports': ['error', 'lodash'],
    'sort-imports': 'off',
    'babel/semi': ['error', 'always'],
    'promise/no-callback-in-promise': 'error',
    'promise/no-new-statics': 'error',
    'promise/no-promise-in-callback': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/no-return-wrap': ['error', { allowReject: true }],
    'promise/param-names': 'error',
    'promise/valid-params': 'error',
    'react/forbid-prop-types': ['error', { forbid: ['any', 'array'] }],
    'react/forbid-foreign-prop-types': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/jsx-no-literals': 'off',
    'multiline-comment-style': 'off',
    // New rules not in Airbnb
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ], // 4.9
    'implicit-arrow-linebreak': 'off', // 4.12 (breaks prettier)
    // Want to support but disabled in Airbnb
    'jsx-quotes': ['error', 'prefer-double'],
    'newline-before-return': 'error',
    'no-constant-condition': 'error',
    'no-div-regex': 'error',
    'no-eq-null': 'error',
    'no-implicit-coercion': 'error',
    'no-native-reassign': 'error',
    'no-negated-condition': 'error',
    'no-useless-call': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        caughtErrors: 'all',
      },
    ],
    // Breaks try / catch with no captured variable.
    'no-shadow-restricted-names': 'off',
    // Breaks some projects: https://github.com/babel/babel-eslint/issues/541
    'no-octal-escape': 'off',
    // Broken for class properties:
    'react/require-default-props': 'error',
    'react/no-unused-prop-types': 2,
    'react/default-props-match-prop-types': 'off',
    'import/default': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/imports-first': 'error',
    'import/no-named-as-default': 'off',
    'react/jsx-key': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: '(handle|fetch|load)',
        eventHandlerPropPrefix: 'on',
      },
    ],
    'react/sort-comp': [
      'error',
      {
        order: [
          'propTypes',
          'defaultProps',
          '/^(?!handle).+$/',
          'lifecycle',
          'everything-else',
          '/^handle.+$/',
          '/^render.+$/',
          'render',
        ],
        groups: {
          lifecycle: [
            'constructor',
            'getDerivedStateFromProps',
            'componentDidMount',
            'shouldComponentUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount',
          ],
        },
      },
    ],
    // Contains bugs:
    'react/no-typos': 'off',
    // Dont want to support
    'airbnb/i18n-phrase-context': 'off',
    'airbnb/super-props': 'off',
    'airbnb/default-export-filename': 'off',
    //   // Validate jest:
    //   // 'jest/no-disabled-tests': 'error',
    //   // 'jest/no-focused-tests': 'error',
    //   // 'jest/no-identical-title': 'error',
    //   // 'jest/no-jest-import': 'error',
    //   // 'jest/prefer-to-be-null': 'error',
    //   // 'jest/prefer-to-be-undefined': 'error',
    //   // 'jest/prefer-to-have-length': 'error',
    //   // 'jest/valid-expect': 'error'
  },
};
