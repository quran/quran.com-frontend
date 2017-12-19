import chaptersReducer, {
  INITIAL_STATE
} from '../../../src/redux/reducers/chapters';

import {
  FETCH_CHAPTERS,
  FETCH_CHAPTER_INFO,
  SET_CURRENT
} from '../../../src/redux/constants/chapters';

describe('chapters reducer', () => {
  describe('FETCH_CHAPTERS.SUCCESS', () => {
    it('should reduce', () => {
      const chapters = {
        1: { id: 1 }
      };

      expect(
        chaptersReducer(INITIAL_STATE, {
          type: FETCH_CHAPTERS.SUCCESS,
          result: {
            entities: {
              chapters
            }
          }
        })
      ).toEqual({
        ...INITIAL_STATE,
        loaded: true,
        entities: { ...chapters }
      });
    });
  });

  describe('FETCH_CHAPTERS.FAILURE', () => {
    it('should reduce', () => {
      expect(
        chaptersReducer(INITIAL_STATE, {
          type: FETCH_CHAPTERS.FAILURE
        })
      ).toEqual({
        ...INITIAL_STATE,
        errored: true
      });
    });
  });

  describe('FETCH_CHAPTER_INFO.ACTION', () => {
    it('should reduce', () => {
      expect(
        chaptersReducer(INITIAL_STATE, {
          type: FETCH_CHAPTER_INFO.ACTION
        })
      ).toEqual({ ...INITIAL_STATE, infoLoading: true });
    });
  });

  describe('FETCH_CHAPTER_INFO.SUCCESS', () => {
    it('should reduce', () => {
      const chapterInfo = { id: 1 };

      expect(
        chaptersReducer(INITIAL_STATE, {
          type: FETCH_CHAPTER_INFO.SUCCESS,
          id: chapterInfo.id,
          result: {
            chapterInfo
          }
        })
      ).toEqual({
        ...INITIAL_STATE,
        infos: { [chapterInfo.id]: chapterInfo }
      });
    });
  });

  describe('SET_CURRENT.ACTION', () => {
    it('should reduce', () => {
      const current = 'current';

      expect(
        chaptersReducer(INITIAL_STATE, {
          type: SET_CURRENT.ACTION,
          current
        })
      ).toEqual({ ...INITIAL_STATE, current });
    });
  });
});
