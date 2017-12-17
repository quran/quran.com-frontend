import * as chaptersConstants from 'redux/constants/chapters.js';
import * as chaptersActions from '../../../src/redux/actions/chapters.js';

describe('chapters', () => {
  it('actions', () => {
    expect(chaptersActions.loadAll().types.length).toEqual(3);
    expect(chaptersActions.load(1).types.length).toEqual(3);
    expect(chaptersActions.loadInfo('url').types.length).toEqual(3);
    expect(chaptersActions.setCurrent(1).type).toEqual(
      chaptersConstants.SET_CURRENT.ACTION
    );
  });
});
