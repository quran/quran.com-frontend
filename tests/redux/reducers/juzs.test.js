import juzsReducer, { INITIAL_STATE } from '../../../src/redux/reducers/juzs';
import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL
} from '../../../src/redux/constants/juzs';

describe('juzs reducer', () => {
  describe('LOAD', () => {
    it('reduces', () => {
      expect(
        juzsReducer(INITIAL_STATE, {
          type: LOAD
        })
      ).toEqual({ ...INITIAL_STATE, loaded: false, loading: true });
    });
  });

  describe('LOAD_SUCCESS', () => {
    it('reduces', () => {
      const juzs = {
        1: { id: 1 }
      };

      expect(
        juzsReducer(INITIAL_STATE, {
          type: LOAD_SUCCESS,
          result: {
            entities: { juzs }
          }
        })
      ).toEqual({
        ...INITIAL_STATE,
        loaded: true,
        loading: false,
        entities: {
          ...juzs
        }
      });
    });
  });

  describe('LOAD_FAIL', () => {
    it('reduces', () => {
      expect(
        juzsReducer(INITIAL_STATE, {
          type: LOAD_FAIL
        })
      ).toEqual({ ...INITIAL_STATE, errored: true, loading: false });
    });
  });
});
