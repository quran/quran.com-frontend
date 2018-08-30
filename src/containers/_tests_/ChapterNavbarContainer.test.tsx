import { mapStateToProps } from '../ChapterNavbarContainer';
import createStore from '../../redux/createStore';

const state = createStore().getState();
const chapterId = '1';

describe('ChapterNavbarContainer', () => {
  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      expect(
        mapStateToProps(state, {
          match: {
            params: {
              chapterId,
            },
            isExact: true,
            path: '',
            url: '',
          },
        })
      ).toEqual({
        chapter: state.chapters.entities[chapterId],
        verses: state.verses.entities[chapterId],
        chapters: {},
        settings: state.settings,
      });
    });
  });
});
