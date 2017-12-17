import {
  SUGGEST,
  SUGGEST_SUCCESS,
  SUGGEST_FAIL
} from 'redux/constants/suggest.js';
import * as suggestActions from '../../../src/redux/actions/suggest.js';

describe('suggest', () => {
  it('actions', () => {
    expect(suggestActions.suggest().types.length).toEqual(3);
    expect(suggestActions.suggest().types).toEqual([
      SUGGEST,
      SUGGEST_SUCCESS,
      SUGGEST_FAIL
    ]);
  });
});
