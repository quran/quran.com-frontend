# Containers

Previously, we made the mistake of having really fat containers that contained routing logic, redux logic and presentational logic. This cause many problems and difficult files to work with.

Our new way to creating containers is keeping redux logic away from presentational logic. Components should not have anything to do with connecting to redux. This allows our presentational components to not be tied to a client store (whether we use graphql in the future, or another client store).

An example is the `ChapterContainer`:

```tsx
import { connect } from 'react-redux';
import { match } from 'react-router';
import { fetchVerses } from '../redux/actions/verses';
import { fetchChapters } from '../redux/actions/chapters';
import { fetchChapterInfo } from '../redux/actions/chapterInfos';
import ReduxState from '../types/ReduxState';
import Chapter from '../components/Chapter';

type Props = {
  match: match<$TsFixMe>;
};

export const mapStateToProps = (state: ReduxState, ownProps: Props) => {
  const { chapterId } = ownProps.match.params;
  const chapter = state.chapters.entities[chapterId];
  const verses = state.verses.entities[chapterId];

  return {
    chapter,
    verses,
    chapters: state.chapters.entities,
    chapterInfo: state.chapterInfos.entities[chapterId],
    isVersesLoading: state.verses.isLoading,
    isChapterLoading: state.chapters.isLoading,
    lines: state.lines.entities,
    settings: state.settings,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchVerses,
    fetchChapters,
    fetchChapterInfo,
  }
)(Chapter);
```

The only logic contained here is what data will be collected from redux, the actions and the component the data and actions will be passed to. This makes it very easy to test container logic. 