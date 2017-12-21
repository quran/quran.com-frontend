import { FETCH_JUZS } from 'redux/constants/juzs.js';
import { loadJuzs } from '../../../src/redux/actions/juzs.js';

describe('juzs', () => {
  it('actions', () => {
    expect(loadJuzs().types.length).toEqual(3);
    expect(loadJuzs().types).toEqual([
      FETCH_JUZS.ACTION,
      FETCH_JUZS.SUCCESS,
      FETCH_JUZS.FAILURE
    ]);
  });
});
