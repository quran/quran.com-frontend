import fontFaceConstant from 'redux/constants/fontFace.js';
import fontFaceAction from '../../../src/redux/actions/fontFace.js';

describe('fontFace', () => {
  it('actions', () => {
    const className = 'className';
    expect(fontFaceAction(className).type).toEqual(fontFaceConstant);
    expect(fontFaceAction(className).className).toEqual(className);
  });
});
