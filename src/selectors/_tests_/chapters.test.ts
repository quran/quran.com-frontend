import range from 'lodash/range';
import { NUMBER_OF_CHAPTERS } from '../../constants/index';
import { isAllLoaded } from '../chapters';

describe('chapters selectors', () => {
  describe('isAllLoaded', () => {
    it('returns false when not all chapters are loaded', () => {
      expect(
        isAllLoaded({
          chapters: {
            entities: {},
          },
          verses: {},
          audioplayer: {},
          lines: {},
          options: {},
          juzs: {},
          settings: {},
          chapterInfos: {},
        })
      ).toBeFalsy();
    });

    it('returns false when not all chapters are loaded', () => {
      expect(
        isAllLoaded({
          chapters: {
            entities: {
              1: {},
            },
          },
          verses: {},
          audioplayer: {},
          lines: {},
          options: {},
          juzs: {},
          settings: {},
          chapterInfos: {},
        })
      ).toBeFalsy();
    });

    it('returns false when not all chapters are loaded', () => {
      const entities = range(NUMBER_OF_CHAPTERS).reduce(
        (all, number) => ({ ...all, [number]: {} }),
        {}
      );

      expect(
        isAllLoaded({
          chapters: {
            entities,
          },
          verses: {},
          audioplayer: {},
          lines: {},
          options: {},
          juzs: {},
          settings: {},
          chapterInfos: {},
        })
      ).toBeTruthy();
    });
  });
});
