import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import qs from 'qs';
import last from 'lodash/last';
import isEmpty from 'lodash/isEmpty';
import { match as MatchType } from 'react-router';
import Loader from 'quran-components/lib/Loader';
import { Location } from 'history';
import {
  ChapterShape,
  VerseShape,
  LineShape,
  ChapterInfoShape,
} from '../shapes';
import makeHelmetTags from '../helpers/makeHelmetTags';
import { chapterLdJson } from '../helpers/ldJson';
import { determinePage } from '../helpers/determinePage';
import PageContainer from './dls/PageContainer';
import Bismillah from './Bismillah';
import ChapterPagination from './chapter/ChapterPagination';
import PageView from './chapter/PageView';
import ListView from './chapter/ListView';
import TopOptions from './chapter/TopOptions';
import SettingsShape from '../shapes/SettingsShape';
import { FetchVerses } from '../redux/actions/verses';
import { FetchChapters } from '../redux/actions/chapters';
import { FetchChapterInfo } from '../redux/actions/chapterInfos';
import { NUMBER_OF_CHAPTERS } from '../constants';
import AudioplayerContainer from '../containers/AudioplayerContainer';
import ChapterInfoPanelContainer from '../containers/ChapterInfoPanelContainer';

const propTypes = {
  chapter: ChapterShape.isRequired,
  chapters: PropTypes.objectOf(ChapterShape).isRequired,
  fetchVerses: PropTypes.func.isRequired,
  fetchChapters: PropTypes.func.isRequired,
  fetchChapterInfo: PropTypes.func.isRequired,
  setCurrentVerseKey: PropTypes.func.isRequired,
  lines: PropTypes.object.isRequired,
  chapterInfo: ChapterInfoShape.isRequired,
  isVersesLoading: PropTypes.bool.isRequired,
  settings: SettingsShape.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      chapterId: PropTypes.string.isRequired,
    }),
  }).isRequired,
  verses: PropTypes.objectOf(VerseShape),
  isEndOfChapter: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const defaultProps = {
  verses: {},
};

type Props = {
  fetchVerses: FetchVerses;
  fetchChapters: FetchChapters;
  fetchChapterInfo: FetchChapterInfo;
  match: MatchType<$TsFixMe>;
  chapter: ChapterShape;
  verses: { [verseKey: string]: VerseShape };
  chapters: { [chapterId: string]: ChapterShape };
  lines: { [key: string]: LineShape };
  chapterInfo: ChapterInfoShape;
  settings: SettingsShape;
  isVersesLoading: boolean;
  location: Location;
};

class Chapter extends Component<Props> {
  public static propTypes = propTypes;
  public static defaultProps = defaultProps;

  componentDidMount() {
    this.bootstrap();
  }

  componentDidUpdate({
    match: {
      params: { chapterId: prevChapterId },
    },
  }: Props) {
    const {
      match: {
        params: { chapterId },
      },
    } = this.props;

    if (chapterId !== prevChapterId) {
      this.bootstrap();
    }
  }

  fetchVerses = () => {
    const { match, fetchVerses, settings, location } = this.props;
    const { params } = match;

    if (this.isVersesFetched()) return null;

    const chapterId = parseInt(params.chapterId, 10);
    const paging = determinePage(params.range);
    const translations =
      params.translations ||
      (location && location.search && qs.parse(location.search).translations);

    if (__CLIENT__) {
      fetchVerses(chapterId, paging, { translations }, settings);

      return null;
    }

    return fetchVerses(chapterId, paging, { translations }, settings);
  };

  fetchChapters = () => {
    const { fetchChapters, chapters } = this.props;

    if (Object.keys(chapters).length === NUMBER_OF_CHAPTERS) return null;

    if (__CLIENT__) {
      fetchChapters();

      return null;
    }

    return fetchChapters();
  };

  fetchChapterInfo = () => {
    const {
      match: { params },
      fetchChapterInfo,
      chapterInfo,
    } = this.props;

    if (chapterInfo) return null;

    if (__CLIENT__) {
      fetchChapterInfo(params.chapterId, params.language);

      return null;
    }

    return fetchChapterInfo(params.chapterId, params.language);
  };

  isVersesFetched = () => {
    const { match, verses } = this.props;
    const { params } = match;
    const paging = determinePage(params.range);

    if (paging.offset) {
      return (
        verses[
          `${params.chapterId}:${paging.offset ? paging.offset + 1 : 1}`
        ] &&
        verses[
          `${params.chapterId}:${
            paging.offset && paging.limit ? paging.offset + paging.limit : 10
          }`
        ]
      );
    }

    return verses[`${params.chapterId}:1`];
  };

  bootstrap() {
    const promises = [
      this.fetchVerses(),
      this.fetchChapters(),
      this.fetchChapterInfo(),
    ];

    return Promise.all(promises);
  }

  handleLazyLoad = () => {
    const { chapter, verses, settings, fetchVerses } = this.props;
    const versesArray = Object.values(verses);
    const firstVerse = versesArray[0];
    const lastVerse: VerseShape | undefined = last(versesArray);

    if (!firstVerse || !lastVerse) {
      return null;
    }

    const range = [firstVerse.verseNumber, lastVerse.verseNumber];
    const isEndOfSurah = lastVerse.verseNumber === chapter.versesCount;

    const size = 10;
    const from = range[1];
    const to = from + size;
    const paging = { offset: from, limit: to - from };

    if (
      !isEndOfSurah &&
      !versesArray.find((verse: VerseShape) => verse.verseNumber === to)
    ) {
      fetchVerses(chapter.chapterNumber, paging, {}, settings);
    }

    return false;
  };

  render() {
    const {
      chapter,
      verses,
      lines,
      settings,
      match,
      isVersesLoading,
    } = this.props;

    const versesArray = Object.values(verses);
    const lastVerse: VerseShape | undefined = last(versesArray);
    const isEndOfChapter: boolean | undefined =
      lastVerse && lastVerse.verseNumber === chapter.versesCount;
    const isSingleVerse =
      !!match.params.range && !match.params.range.includes('-');

    if ((!chapter || isVersesLoading) && isEmpty(versesArray)) {
      return <Loader />;
    }

    return (
      <div className="chapter-body">
        <Helmet
          {...makeHelmetTags({
            // TODO: add this
            // title: this.getTitle(),
            // description: this.getDescription(),
          })}
          script={chapterLdJson(chapter)}
          style={[
            {
              cssText: `.text-arabic{font-size: ${
                settings.fontSize.arabic
              }rem;} .text-translation{font-size: ${
                settings.fontSize.translation
              }rem;}`,
            },
          ]}
        />
        <PageContainer className="container-fluid">
          <div className="row">
            <ChapterInfoPanelContainer chapter={chapter} />
            <div className="col-md-10 col-md-offset-1">
              {__CLIENT__ && <TopOptions chapter={chapter} />}
              {chapter.bismillahPre && <Bismillah />}
              {settings.isReadingMode ? (
                <PageView lines={lines} />
              ) : (
                <ListView chapter={chapter} verses={verses} />
              )}
            </div>
            <div className="col-md-10 col-md-offset-1">
              <ChapterPagination
                chapter={chapter}
                isSingleVerse={isSingleVerse}
                isEndOfChapter={!!isEndOfChapter}
                isLoading={isVersesLoading}
                settings={settings}
                verses={verses}
                onLazyLoad={this.handleLazyLoad}
              />
            </div>
          </div>
        </PageContainer>

        {__CLIENT__ && (
          <AudioplayerContainer
            chapter={chapter}
            verses={verses}
            onLoadAyahs={this.handleLazyLoad}
          />
        )}
      </div>
    );
  }
}

export default Chapter;
