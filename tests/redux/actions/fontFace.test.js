import FONT_FACE from 'redux/constants/fontFace';
import fontFaceAction from '../../../src/redux/actions/fontFace';

describe('fontFace', () => {
  it('actions', () => {
    const className = 'className';
    expect(fontFaceAction(className).type).toEqual(FONT_FACE.ACTION);
    expect(fontFaceAction(className).className).toEqual(className);
  });
});
