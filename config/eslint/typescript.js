const extensions = ['.tsx', '.ts', '.js', '.d.ts'];
const extensionPattern = `{${extensions.join(',')}}`;

module.exports = {
  parser: 'typescript-eslint-parser',

  plugins: ['typescript'],

  settings: {
    'import/extensions': extensions,
    'import/resolver': {
      node: {
        extensions,
      },
    },
    'import/parsers': {
      'typescript-eslint-parser': ['.ts', '.tsx'],
    },
  },

  rules: {
    'no-restricted-globals': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'error',
    'import/named': 'off',
    'import/extensions': [
      'error',
      'never',
      {
        json: 'always',
      },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'typescript/adjacent-overload-signatures': 'error',
    'typescript/class-name-casing': 'error',
    'typescript/member-delimiter-style': 'error',
    'typescript/member-ordering': 'off', // Prefer react/sort-comp
    'typescript/no-angle-bracket-type-assertion': 'error',
    'typescript/no-empty-interface': 'error',
    'typescript/no-array-constructor': 'error',
    'typescript/no-triple-slash-reference': 'error',
    'typescript/no-parameter-properties': 'error',
    'typescript/no-unused-vars': 'error',
    'typescript/no-use-before-define': 'error',
    'typescript/prefer-namespace-keyword': 'error',
    'typescript/type-annotation-spacing': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [`**/*.{test,spec}${extensionPattern}`],
        optionalDependencies: false,
      },
    ],
  },
};
