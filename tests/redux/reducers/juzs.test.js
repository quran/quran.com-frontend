import juzsReducer, { INITIAL_STATE } from '../../../src/redux/reducers/juzs';
import { FETCH_JUZS } from '../../../src/redux/constants/juzs';

describe('juzs reducer', () => {
  describe('FETCH_JUZS.ACTION', () => {
    it('reduces', () => {
      expect(
        juzsReducer(INITIAL_STATE, {
          type: FETCH_JUZS.ACTION
        })
      ).toEqual({ ...INITIAL_STATE, loaded: false, loading: true });
    });
  });

  describe('FETCH_JUZS.SUCCESS', () => {
    it('reduces', () => {
      const juzs = {
        1: { id: 1 }
      };

      expect(
        juzsReducer(INITIAL_STATE, {
          type: FETCH_JUZS.SUCCESS,
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

  describe('FETCH_JUZS.FAILURE', () => {
    it('reduces', () => {
      expect(
        juzsReducer(INITIAL_STATE, {
          type: FETCH_JUZS.FAILURE
        })
      ).toEqual({ ...INITIAL_STATE, errored: true, loading: false });
    });
  });
});
