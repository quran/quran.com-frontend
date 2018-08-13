import { mapStateToProps } from '../ChapterInfoPanelContainer';
import createStore from '../../redux/createStore';
import { chapter } from '../../../tests/fixtures/chapters';

const state = createStore().getState();
const chapterId = '1';

describe('ChapterInfoPanelContainer', () => {
  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      expect(
        mapStateToProps(state, {
          chapter,
        })
      ).toEqual({
        chapterInfo: state.chapterInfos.entities[chapter.id],
        isShowingChapterInfo: state.settings.isShowingChapterInfo,
      });
    });
  });
});
