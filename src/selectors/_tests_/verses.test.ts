import range from 'lodash/range';
import { isLoaded } from '../verses';
import createStore from '../../redux/createStore';
import { getVerse } from '../../../tests/fixtures/verse';

const state = createStore().getState();
const entities = range(10).reduce(
  (all, number) => ({
    ...all,
    [`1:${number + 1}`]: getVerse(1, number + 1),
  }),
  {}
);

describe('verses selectors', () => {
  describe('isLoaded', () => {
    it('returns false when not all verses are loaded', () => {
      expect(
        isLoaded(
          {
            ...state,
          },
          1
        )
      ).toBeFalsy();
    });

    it('returns false when verses are loaded but not for the page', () => {
      expect(
        isLoaded(
          {
            ...state,
            verses: {
              ...state.verses,
              entities: {
                1: entities,
              },
            },
          },
          1,
          { offset: 50, limit: 10 }
        )
      ).toBeFalsy();
    });

    it('returns true when all verses are loaded', () => {
      expect(
        isLoaded(
          {
            ...state,
            verses: {
              ...state.verses,
              entities: {
                1: entities,
              },
            },
          },
          1
        )
      ).toBeTruthy();
    });
  });
});
