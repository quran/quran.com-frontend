import audioplayerReducer, {
  INITIAL_STATE
} from '../../../src/redux/reducers/audioplayer';

import {
  SET_CURRENT_FILE,
  PLAY,
  PAUSE,
  SET_REPEAT,
  TOGGLE_SCROLL,
  UPDATE
  // LOAD,
  // LOAD_FAIL
} from '../../../src/redux/constants/audioplayer';

import {
  LOAD as VERSES_LOAD,
  CLEAR_CURRENT as VERSES_CLEAR_CURRENT,
  SET_CURRENT_VERSE
} from '../../../src/redux/constants/verses';

describe('audioplayer reducer', () => {
  describe('VERSES_CLEAR_CURRENT', () => {
    it('should reduce', () => {
      expect(
        audioplayerReducer(INITIAL_STATE, { type: VERSES_CLEAR_CURRENT, id: 1 })
      ).toEqual({
        ...INITIAL_STATE,
        files: {
          1: {}
        }
      });
    });
  });

  describe('VERSES_LOAD', () => {
    it('should reduce', () => {
      expect(
        audioplayerReducer(INITIAL_STATE, {
          type: VERSES_LOAD
        })
      ).toEqual({ ...INITIAL_STATE, isLoading: false });
    });
  });

  describe('UPDATE', () => {
    it('should reduce', () => {
      expect(
        audioplayerReducer(INITIAL_STATE, {
          type: UPDATE,
          payload: {
            hello: 'there'
          }
        })
      ).toEqual({ ...INITIAL_STATE, hello: 'there' });
    });
  });

  describe('PLAY', () => {
    it('should reduce', () => {
      expect(
        audioplayerReducer(INITIAL_STATE, {
          type: PLAY
        })
      ).toEqual({ ...INITIAL_STATE, isPlaying: true });
    });
  });

  describe('PAUSE', () => {
    it('should reduce', () => {
      expect(
        audioplayerReducer(INITIAL_STATE, {
          type: PAUSE
        })
      ).toEqual({ ...INITIAL_STATE, isPlaying: false });
    });
  });

  describe('SET_REPEAT', () => {
    it('should reduce', () => {
      expect(
        audioplayerReducer(INITIAL_STATE, {
          type: SET_REPEAT,
          repeat: 1
        })
      ).toEqual({ ...INITIAL_STATE, repeat: 1 });
    });
  });

  describe('TOGGLE_SCROLL', () => {
    it('should reduce', () => {
      expect(
        audioplayerReducer(
          { ...INITIAL_STATE, shouldScroll: true },
          { type: TOGGLE_SCROLL }
        )
      ).toEqual({ ...INITIAL_STATE, shouldScroll: false });
    });
  });

  describe('SET_CURRENT_FILE', () => {
    it('should reduce', () => {
      expect(
        audioplayerReducer(INITIAL_STATE, { type: SET_CURRENT_FILE, file: 1 })
      ).toEqual({ ...INITIAL_STATE, currentFile: 1 });
    });
  });

  describe('SET_CURRENT_VERSE', () => {
    it('should reduce', () => {
      expect(
        audioplayerReducer(INITIAL_STATE, {
          type: SET_CURRENT_VERSE,
          id: 1
        })
      ).toEqual({ ...INITIAL_STATE, currentVerse: 1 });
    });
  });
});
