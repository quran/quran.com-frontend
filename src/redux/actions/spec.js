import * as audioplayerConstant from 'redux/constants/audioplayer.js';
import * as ayahsConstants from 'redux/constants/verses.js';
import * as surahsConstants from 'redux/constants/chapters.js';

import * as audioplayerActions from './audioplayer.js';
import * as ayahsActions from './verses.js';
import * as surahsActions from './chapters.js';

describe('action tests', () => {
  it('audioplayer actions', () => {
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
    expect(audioplayerActions.update('abc').type.).toEqual(
      audioplayerConstant.UPDATE
    );
  });

  it('ayahs actions', () => {
    expect(ayahsActions.load(1, 2, 4).types.length).toEqual(3);
    expect(ayahsActions.clearCurrent().type).toEqual(
      ayahsConstants.CLEAR_CURRENT
    );
    expect(ayahsActions.clearCurrentWord(1).type).toEqual(
      ayahsConstants.CLEAR_CURRENT_WORD
    );
    expect(ayahsActions.setCurrentVerse(1).type).toEqual(
      ayahsConstants.SET_CURRENT_VERSE
    );
    expect(ayahsActions.setCurrentWord(1).type).toEqual(
      ayahsConstants.SET_CURRENT_WORD
    );
  });

  it('surahs actions', () => {
    expect(surahsActions.loadAll().types.length).toEqual(3);
    expect(surahsActions.load(1).types.length).toEqual(3);
    expect(surahsActions.loadInfo('url').types.length).toEqual(3);
    expect(surahsActions.setCurrent(1).type.ACTION).toEqual(
      surahsConstants.SET_CURRENT
    );
  });
});
