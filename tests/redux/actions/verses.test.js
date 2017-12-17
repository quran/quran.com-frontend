import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  CLEAR_CURRENT,
  SET_CURRENT_VERSE,
  SET_CURRENT_WORD,
  CLEAR_CURRENT_WORD,
  LOAD_TAFSIR,
  LOAD_TAFSIR_SUCCESS,
  LOAD_TAFSIR_FAIL
} from 'redux/constants/verses.js';

import {
  load,
  loadTafsir,
  clearCurrent,
  clearCurrentWord,
  setCurrentVerse,
  setCurrentWord,
  isTafsirLoaded,
  isLoaded
} from '../../../src/redux/actions/verses.js';

describe('verses', () => {
  it('load', () => {
    expect(load(1, 2, 4).types.length).toEqual(3);
    expect(load(1, 2, 4).types).toEqual([LOAD, LOAD_SUCCESS, LOAD_FAIL]);
  });

  it('loadTafsir', () => {
    expect(loadTafsir(1, 2, 4).types.length).toEqual(3);
    expect(loadTafsir(1, 2, 4).types).toEqual([
      LOAD_TAFSIR,
      LOAD_TAFSIR_SUCCESS,
      LOAD_TAFSIR_FAIL
    ]);
  });

  it('setCurrentWord', () => {
    expect(setCurrentWord(1).type).toEqual(SET_CURRENT_WORD);
  });

  it('clearCurrentWord', () => {
    expect(clearCurrentWord(1).type).toEqual(CLEAR_CURRENT_WORD);
  });

  it('clearCurrent', () => {
    expect(clearCurrent().type).toEqual(CLEAR_CURRENT);
  });

  it('setCurrentVerse', () => {
    expect(setCurrentVerse(1).type).toEqual(SET_CURRENT_VERSE);
  });

  describe('isTafsirLoaded', () => {
    const chapterId = 1;
    const verseId = 2;
    const tafsirId = 3;

    it('return true if found', () => {
      expect(
        isTafsirLoaded(
          {
            verses: {
              entities: {
                [chapterId]: {}
              },
              tafsirs: {
                [`${chapterId}:${verseId}-${tafsirId}`]: {}
              }
            }
          },
          chapterId,
          verseId,
          tafsirId
        )
      ).toBeTruthy();
    });

    it('return false if no verses', () => {
      expect(
        isTafsirLoaded(
          { verses: { entities: {}, tafsirs: { '1:2-3': {} } } },
          chapterId,
          verseId,
          tafsirId
        )
      ).toBeFalsy();
    });

    it('return false if no tafsir', () => {
      expect(
        isTafsirLoaded(
          { verses: { entities: { [chapterId]: {} }, tafsirs: {} } },
          chapterId,
          verseId,
          tafsirId
        )
      ).toBeFalsy();
    });
  });

  describe('isLoaded', () => {
    const chapterId = 1;

    it('return true if found', () => {
      expect(
        isLoaded(
          {
            verses: {
              entities: {
                [chapterId]: {
                  [`${chapterId}:1`]: {}
                }
              }
            }
          },
          chapterId
        )
      ).toBeTruthy();
    });

    it('return false if no verses', () => {
      expect(isLoaded({ verses: { entities: {} } }, chapterId)).toBeFalsy();
    });

    it('return false if no first verse', () => {
      expect(
        isLoaded(
          { verses: { entities: { [chapterId]: { [`${chapterId}:2`]: {} } } } },
          chapterId
        )
      ).toBeFalsy();
    });
  });
});
