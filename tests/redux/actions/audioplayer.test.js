import * as audioplayerConstant from 'redux/constants/audioplayer.js';
import * as audioplayerActions from '../../../src/redux/actions/audioplayer';

describe('audoplayer', () => {
  it('actions', () => {
    expect(audioplayerActions.setCurrentFile('fil').type).toEqual(
      audioplayerConstant.SET_CURRENT_FILE
    );
    expect(audioplayerActions.setCurrentWord('word').type).toEqual(
      audioplayerConstant.SET_CURRENT_WORD
    );
    expect(audioplayerActions.play().type).toEqual(audioplayerConstant.PLAY);
    expect(audioplayerActions.pause().type).toEqual(audioplayerConstant.PAUSE);
    expect(audioplayerActions.next('abc').type).toEqual(
      audioplayerConstant.NEXT
    );
    expect(audioplayerActions.previous('abc').type).toEqual(
      audioplayerConstant.PREVIOUS
    );
    expect(audioplayerActions.setRepeat('abc').type).toEqual(
      audioplayerConstant.SET_REPEAT
    );
    expect(audioplayerActions.toggleScroll().type).toEqual(
      audioplayerConstant.TOGGLE_SCROLL
    );
    expect(audioplayerActions.buildOnClient('abc').type).toEqual(
      audioplayerConstant.BUILD_ON_CLIENT
    );
    expect(audioplayerActions.update('abc').type).toEqual(
      audioplayerConstant.UPDATE
    );
  });
});
