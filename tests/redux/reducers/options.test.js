import optionsReducer, {
  INITIAL_STATE
} from '../../../src/redux/reducers/options';

import {
  SET_OPTION,
  LOAD_RECITERS,
  LOAD_RECITERS_SUCCESS,
  SET_USER_AGENT,
  LOAD_TRANSLATIONS,
  LOAD_TRANSLATIONS_SUCCESS
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

  describe('LOAD_RECITERS', () => {
    it('should reduce', () => {
      expect(
        optionsReducer(INITIAL_STATE, {
          type: LOAD_RECITERS
        })
      ).toEqual({ ...INITIAL_STATE, loadingRecitations: true });
    });
  });

  describe('LOAD_RECITERS_SUCCESS', () => {
    it('should reduce', () => {
      const recitations = { id: 1 };
      expect(
        optionsReducer(
          { ...INITIAL_STATE, loadingRecitations: true },
          {
            type: LOAD_RECITERS_SUCCESS,
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

  describe('LOAD_TRANSLATIONS', () => {
    it('should reduce', () => {
      expect(
        optionsReducer(INITIAL_STATE, {
          type: LOAD_TRANSLATIONS
        })
      ).toEqual({ ...INITIAL_STATE, loadingTranslations: true });
    });
  });

  describe('LOAD_TRANSLATIONS_SUCCESS', () => {
    it('should reduce', () => {
      const translations = { id: 1 };
      expect(
        optionsReducer(
          { ...INITIAL_STATE, loadingTranslations: true },
          { type: LOAD_TRANSLATIONS_SUCCESS, result: { translations } }
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
