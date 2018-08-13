import range from 'lodash/range';
import { NUMBER_OF_CHAPTERS } from '../../constants/index';
import { isAllLoaded } from '../chapters';
import createStore from '../../redux/createStore';
import { chapter } from '../../../tests/fixtures/chapters';

const state = createStore().getState();

describe('chapters selectors', () => {
  describe('isAllLoaded', () => {
    it('returns false when not all chapters are loaded', () => {
      expect(
        isAllLoaded({
          ...state,
        })
      ).toBeFalsy();
    });

    it('returns false when not all chapters are loaded', () => {
      expect(
        isAllLoaded({
          ...state,
          chapters: {
            ...state.chapters,
            entities: {
              1: chapter,
            },
          },
        })
      ).toBeFalsy();
    });

    it('returns false when not all chapters are loaded', () => {
      const entities = range(NUMBER_OF_CHAPTERS).reduce(
        (all, number) => ({ ...all, [number]: chapter }),
        {}
      );

      expect(
        isAllLoaded({
          ...state,
          chapters: {
            ...state.chapters,
            entities,
          },
        })
      ).toBeTruthy();
    });
  });
});
