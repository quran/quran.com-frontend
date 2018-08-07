// eslint-disable-next-line
const Enzyme = require('enzyme');
// eslint-disable-next-line
const Adapter = require('enzyme-adapter-react-16');
// eslint-disable-next-line
const jestFetch = require('jest-fetch-mock');

global.fetch = jestFetch;
// eslint-disable-next-line
global.__SERVER__ = false;

Enzyme.configure({ adapter: new Adapter() });
