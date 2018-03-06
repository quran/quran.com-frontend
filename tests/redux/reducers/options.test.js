import optionsReducer, {
  INITIAL_STATE
} from '../../../src/redux/reducers/options';

import {
  SET_OPTION,
  SET_USER_AGENT,
  FETCH_RECITERS,
  FETCH_TRANSLATIONS
} from '../../../src/redux/constants/options';

describe('options reducer', () => {
  describe('SET_OPTION', () => {
    it('should reduce', () => {
      expect(
        optionsReducer(INITIAL_STATE, {
          type: SET_OPTION,
          payload: { hello: 'there' }
        })
      ).toEqual({
        ...INITIAL_STATE,
        hello: 'there'
      });
    });
  });

  describe('FETCH_RECITERS.ACTION', () => {
    it('should reduce', () => {
      expect(
        optionsReducer(INITIAL_STATE, {
          type: FETCH_RECITERS.ACTION
        })
      ).toEqual({ ...INITIAL_STATE, loadingRecitations: true });
    });
  });

  describe('FETCH_RECITERS.SUCCESS', () => {
    it('should reduce', () => {
      const recitations = { id: 1 };
      expect(
        optionsReducer(
          { ...INITIAL_STATE, loadingRecitations: true },
          {
            type: FETCH_RECITERS.SUCCESS,
            result: { recitations }
          }
        )
      ).toEqual({
        ...INITIAL_STATE,
        loadingRecitations: false,
        options: {
          ...INITIAL_STATE.options,
          recitations
        }
      });
    });
  });

  describe('SET_USER_AGENT', () => {
    it('should reduce', () => {
      expect(
        optionsReducer(INITIAL_STATE, {
          type: SET_USER_AGENT,
          userAgent: 'chrome'
        })
      ).toEqual({
        ...INITIAL_STATE,
        userAgent: 'chrome'
      });
    });
  });

  describe('FETCH_TRANSLATIONS.ACTION', () => {
    it('should reduce', () => {
      expect(
        optionsReducer(INITIAL_STATE, {
          type: FETCH_TRANSLATIONS.ACTION
        })
      ).toEqual({ ...INITIAL_STATE, loadingTranslations: true });
    });
  });

  describe('FETCH_TRANSLATIONS.SUCCESS', () => {
    it('should reduce', () => {
      const translations = { id: 1 };
      expect(
        optionsReducer(
          { ...INITIAL_STATE, loadingTranslations: true },
          { type: FETCH_TRANSLATIONS.SUCCESS, result: { translations } }
        )
      ).toEqual({
        ...INITIAL_STATE,
        loadingTranslations: false,
        options: {
          ...INITIAL_STATE.options,
          translations
        }
      });
    });
  });
});
