const config = require('../../.prettierrc.js');

module.exports = {
  extends: ['prettier', 'prettier/react'],

  plugins: ['prettier'],

  rules: {
    'prettier/prettier': ['error', config],
  },
};
