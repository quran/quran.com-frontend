import {
  FETCH_CHAPTERS,
  FETCH_CHAPTER_INFO,
  SET_CURRENT
} from '../../../src/redux/constants/chapters.js';

import {
  loadAll,
  load,
  loadInfo,
  setCurrent
} from '../../../src/redux/actions/chapters';

describe('chapters', () => {
  describe('loadAll', () => {
    it('correct constants', () => {
      fetch.mockResponse(JSON.stringify({}));
      expect(loadAll().types.length).toEqual(3);
      expect(loadAll().types).toEqual([
        FETCH_CHAPTERS.ACTION,
        FETCH_CHAPTERS.SUCCESS,
        FETCH_CHAPTERS.FAILURE
      ]);
    });
  });

  describe('load', () => {
    it('correct constants', () => {
      fetch.mockResponse(JSON.stringify({}));
      expect(load(1).types.length).toEqual(3);
      expect(load(1).types).toEqual([
        FETCH_CHAPTERS.ACTION,
        FETCH_CHAPTERS.SUCCESS,
        FETCH_CHAPTERS.FAILURE
      ]);
    });
  });

  describe('loadInfo', () => {
    it('correct constants', () => {
      fetch.mockResponse(JSON.stringify({}));
      expect(loadInfo('url').types.length).toEqual(3);
      expect(loadInfo('url').types).toEqual([
        FETCH_CHAPTER_INFO.ACTION,
        FETCH_CHAPTER_INFO.SUCCESS,
        FETCH_CHAPTER_INFO.FAIL
      ]);
    });
  });

  describe('actions', () => {
    it('correct constants', () => {
      expect(setCurrent(1).type).toEqual(SET_CURRENT.ACTION);
    });
  });
});
