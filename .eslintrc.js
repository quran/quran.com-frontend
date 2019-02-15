const path = require('path');

const paths = [path.join(__dirname, './config/eslint/base.js')];

paths.push(path.join(__dirname, './config/eslint/typescript.js'));

paths.push(path.join(__dirname, './config/eslint/prettier.js'));

module.exports = {
  extends: paths,
};
