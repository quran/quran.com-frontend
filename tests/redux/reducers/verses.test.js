import versesReducer, {
  INITIAL_STATE
} from '../../../src/redux/reducers/verses';
import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  CLEAR_CURRENT,
  SET_CURRENT_VERSE,
  SET_CURRENT_WORD,
  CLEAR_CURRENT_WORD,
  LOAD_TAFSIR,
  LOAD_TAFSIR_SUCCESS
} from '../../../src/redux/constants/verses.js';

describe('verses reducer', () => {
  describe('SET_CURRENT_VERSE', () => {
    const id = 1;

    it('reduces', () => {
      expect(
        versesReducer(INITIAL_STATE, { type: SET_CURRENT_VERSE, id })
      ).toEqual({
        ...INITIAL_STATE,
        current: id,
        currentWord: null
      });
    });
  });

  describe('SET_CURRENT_WORD', () => {
    const id = 1;

    it('reduces', () => {
      expect(
        versesReducer(INITIAL_STATE, { type: SET_CURRENT_WORD, id })
      ).toEqual({
        ...INITIAL_STATE,
        current: null,
        currentWord: 1
      });
    });
  });

  describe('CLEAR_CURRENT_WORD', () => {
    it('reduces', () => {
      expect(
        versesReducer(
          {
            ...INITIAL_STATE,
            currentWord: 1
          },
          { type: CLEAR_CURRENT_WORD }
        )
      ).toEqual({
        ...INITIAL_STATE,
        currentWord: null
      });
    });
  });

  describe('CLEAR_CURRENT', () => {
    it('reduces', () => {
      const id = 1;

      expect(
        versesReducer(
          {
            ...INITIAL_STATE,
            currentWord: 1,
            current: 1,
            entities: {
              1: {
                name: 'one'
              }
            }
          },
          { type: CLEAR_CURRENT, id }
        )
      ).toEqual({
        ...INITIAL_STATE,
        current: null,
        currentWord: null,
        entities: {
          1: {}
        }
      });
    });
  });

  describe('LOAD', () => {
    it('reduces', () => {
      expect(
        versesReducer(
          { ...INITIAL_STATE, loaded: true, loading: false },
          { type: LOAD }
        )
      ).toEqual({
        ...INITIAL_STATE,
        loaded: false,
        loading: true
      });
    });
  });

  describe('LOAD_SUCCESS', () => {
    it('reduces', () => {
      expect(
        versesReducer(
          { ...INITIAL_STATE, entities: {} },
          {
            type: LOAD_SUCCESS,
            result: { entities: {}, result: [1] },
            chapterId: 1
          }
        )
      ).toEqual({
        ...INITIAL_STATE,
        loaded: true,
        loading: false,
        current: 1,
        entities: {
          1: {}
        },
        result: {
          0: 1
        }
      });
    });
  });

  describe('LOAD_FAIL', () => {
    it('reduces', () => {
      expect(
        versesReducer(INITIAL_STATE, {
          type: LOAD_FAIL
        })
      ).toEqual(INITIAL_STATE);
    });
  });

  describe('LOAD_TAFSIR', () => {
    it('reduces', () => {
      expect(
        versesReducer(
          { ...INITIAL_STATE, tafsirLoading: false },
          {
            type: LOAD_TAFSIR
          }
        )
      ).toEqual({ ...INITIAL_STATE, tafsirLoading: true });
    });
  });

  describe('LOAD_TAFSIR_SUCCESS', () => {
    it('reduces', () => {
      const verseKey = '1:1';
      const tafsirId = 1;
      const tafsir = { verseKey, tafsirId };

      expect(
        versesReducer(
          { ...INITIAL_STATE, tafsirLoading: true },
          { type: LOAD_TAFSIR_SUCCESS, result: { tafsirs: [tafsir] }, tafsirId }
        )
      ).toEqual({
        ...INITIAL_STATE,
        tafsirLoading: false,
        tafsirs: {
          [`${verseKey}-${tafsirId}`]: tafsir
        }
      });
    });
  });
});
