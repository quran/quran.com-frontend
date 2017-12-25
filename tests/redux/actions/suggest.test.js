import { SUGGEST } from 'redux/constants/suggest.js';
import { suggest } from '../../../src/redux/actions/suggest.js';

describe('suggest', () => {
  it('actions', () => {
    expect(suggest().types.length).toEqual(3);
    expect(suggest().types).toEqual([
      SUGGEST.ACTION,
      SUGGEST.SUCCESS,
      SUGGEST.FAILURE
    ]);
  });
});
