import {
  SET_OPTION,
  LOAD_RECITERS,
  LOAD_RECITERS_SUCCESS,
  LOAD_RECITERS_FAIL,
  SET_USER_AGENT,
  LOAD_TRANSLATIONS,
  LOAD_TRANSLATIONS_SUCCESS,
  LOAD_TRANSLATIONS_FAIL
} from 'redux/constants/options.js';

import {
  isReadingMode,
  isNightMode,
  setOption,
  setUserAgent,
  loadTranslations,
  loadRecitations
} from '../../../src/redux/actions/options.js';

describe('options', () => {
  describe('isReadingMode', () => {
    it('should return true when present and true', () => {
      expect(
        isReadingMode({
          options: { isReadingMode: true }
        })
      ).toBeTruthy();
    });

    it('should return false when present and false', () => {
      expect(
        isReadingMode({
          options: { isReadingMode: false }
        })
      ).toBeFalsy();
    });

    it('should return false when not present', () => {
      expect(
        isReadingMode({
          options: {}
        })
      ).toBe(false);
    });
  });

  describe('isNightMode', () => {
    it('should return true when present and true', () => {
      expect(
        isNightMode({
          options: { isNightMode: true }
        })
      ).toBeTruthy();
    });

    it('should return false when present and false', () => {
      expect(
        isNightMode({
          options: { isNightMode: false }
        })
      ).toBeFalsy();
    });

    it('should return false when not present', () => {
      expect(
        isNightMode({
          options: {}
        })
      ).toBe(false);
    });
  });

  it('setOption', () => {
    const payload = { option1: 1, option2: 2 };

    expect(setOption(payload)).toEqual({
      type: SET_OPTION,
      payload
    });
  });

  it('setUserAgent', () => {
    const userAgent = { user: 'agent' };

    expect(setUserAgent(userAgent)).toEqual({
      type: SET_USER_AGENT,
      userAgent
    });
  });

  it('loadTranslations', () => {
    expect(loadTranslations().types).toEqual([
      LOAD_TRANSLATIONS,
      LOAD_TRANSLATIONS_SUCCESS,
      LOAD_TRANSLATIONS_FAIL
    ]);
  });
  it('loadRecitations', () => {
    expect(loadRecitations().types).toEqual([
      LOAD_RECITERS,
      LOAD_RECITERS_SUCCESS,
      LOAD_RECITERS_FAIL
    ]);
  });
});
