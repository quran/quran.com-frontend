import { LOAD, LOAD_SUCCESS, LOAD_FAIL } from 'redux/constants/juzs.js';
import * as juzsActions from '../../../src/redux/actions/juzs.js';

describe('juzs', () => {
  it('actions', () => {
    expect(juzsActions.loadJuzs().types.length).toEqual(3);
    expect(juzsActions.loadJuzs().types).toEqual([
      LOAD,
      LOAD_SUCCESS,
      LOAD_FAIL
    ]);
  });
});
