// eslint-disable-next-line
const Enzyme = require('enzyme');
// eslint-disable-next-line
const Adapter = require('enzyme-adapter-react-16');
// eslint-disable-next-line
const jestFetch = require('jest-fetch-mock');

global.fetch = jestFetch;

Enzyme.configure({
  adapter: new Adapter(),
});
