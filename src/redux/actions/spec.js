import * as audioplayerConstant from 'redux/constants/audioplayer.js';
import * as ayahsConstants from 'redux/constants/ayahs.js';
import * as surahsConstants from 'redux/constants/chapters.js';

import * as audioplayerActions from './audioplayer.js';
import * as ayahsActions from './ayahs.js';
import * as surahsActions from './chapters.js';

describe('action tests', () => {
  it('audioplayer actions', () => {
    expect(audioplayerActions.setUserAgent('abc').type).to.equal(audioplayerConstant.SET_USER_AGENT);
    expect(audioplayerActions.setCurrentFile('fil').type).to.equal(audioplayerConstant.SET_CURRENT_FILE);
    expect(audioplayerActions.setCurrentWord('word').type).to.equal(audioplayerConstant.SET_CURRENT_WORD);
    expect(audioplayerActions.play().type).to.equal(audioplayerConstant.PLAY);
    expect(audioplayerActions.pause().type).to.equal(audioplayerConstant.PAUSE);
    expect(audioplayerActions.next('abc').type).to.equal(audioplayerConstant.NEXT);
    expect(audioplayerActions.previous('abc').type).to.equal(audioplayerConstant.PREVIOUS);
    expect(audioplayerActions.setRepeat('abc').type).to.equal(audioplayerConstant.SET_REPEAT);
    expect(audioplayerActions.toggleScroll().type).to.equal(audioplayerConstant.TOGGLE_SCROLL);
    expect(audioplayerActions.buildOnClient('abc').type).to.equal(audioplayerConstant.BUILD_ON_CLIENT);
    expect(audioplayerActions.update('abc').type).to.equal(audioplayerConstant.UPDATE);
  });

  it('ayahs actions', () => {
    expect(ayahsActions.load(1, 2, 4).types.length).to.equal(3);
    expect(ayahsActions.clearCurrent().type).to.equal(ayahsConstants.CLEAR_CURRENT);
    expect(ayahsActions.clearCurrentWord(1).type).to.equal(ayahsConstants.CLEAR_CURRENT_WORD);
    expect(ayahsActions.setCurrentAyah(1).type).to.equal(ayahsConstants.SET_CURRENT_AYAH);
    expect(ayahsActions.setCurrentWord(1).type).to.equal(ayahsConstants.SET_CURRENT_WORD);
  });

  it('surahs actions', () => {
    expect(surahsActions.loadAll().types.length).to.equal(3);
    expect(surahsActions.load(1).types.length).to.equal(3);
    expect(surahsActions.loadInfo('url').types.length).to.equal(3);
    expect(surahsActions.setCurrent(1).type).to.equal(surahsConstants.SET_CURRENT);
  });
});
