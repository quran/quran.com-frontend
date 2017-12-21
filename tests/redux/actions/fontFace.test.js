import LOAD from 'redux/constants/fontFace';
import fontFaceAction from '../../../src/redux/actions/fontFace';

describe('fontFace', () => {
  it('actions', () => {
    const className = 'className';
    expect(fontFaceAction(className).type).toEqual(LOAD);
    expect(fontFaceAction(className).className).toEqual(className);
  });
});
