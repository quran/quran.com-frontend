import { LOAD, LOAD_SUCCESS, LOAD_FAIL } from 'redux/constants/juzs.js';
import { loadJuzs } from '../../../src/redux/actions/juzs.js';

describe('juzs', () => {
  it('actions', () => {
    expect(loadJuzs().types.length).toEqual(3);
    expect(loadJuzs().types).toEqual([LOAD, LOAD_SUCCESS, LOAD_FAIL]);
  });
});
