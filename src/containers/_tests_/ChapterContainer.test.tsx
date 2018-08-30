import { mapStateToProps } from '../ChapterContainer';
import createStore from '../../redux/createStore';

const state = createStore().getState();

describe('ChapterContainer', () => {
  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      expect(
        mapStateToProps(state, {
          match: {
            params: {
              chapterId: '1',
            },
            isExact: true,
            path: '',
            url: '',
          },
        })
      ).toEqual({
        chapter: undefined,
        verses: undefined,
        chapters: {},
        chapterInfo: undefined,
        lines: {},
        isVersesLoading: false,
        isChapterLoading: false,
        settings: state.settings,
      });
    });
  });
});
