import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import last from 'lodash/last';
import { match as MatchType } from 'react-router';
import { ChapterShape, VerseShape, LineShape } from '../shapes';
import makeHelmetTags from '../helpers/makeHelmetTags';
import { chapterLdJson } from '../helpers/ldJson';
import { determinePage } from '../helpers/determinePage';
import PageContainer from './dls/PageContainer';
import Bismillah from './Bismillah';
import ChapterPagination from './chapter/ChapterPagination';
import PageView from './chapter/PageView';
import ListView from './chapter/ListView';
import TopOptions from './chapter/TopOptions';
import OptionsShape from '../shapes/OptionsShape';
import { FetchVerses } from '../redux/actions/verses';
import { FetchChapters } from '../redux/actions/chapters';
import { FetchChapterInfo } from '../redux/actions/chapterInfos';

const propTypes = {
  chapter: ChapterShape.isRequired,
  chapters: PropTypes.objectOf(ChapterShape).isRequired,
  fetchVerses: PropTypes.func.isRequired,
  fetchChapters: PropTypes.func.isRequired,
  fetchChapterInfo: PropTypes.func.isRequired,
  setCurrentVerse: PropTypes.func.isRequired,
  lines: PropTypes.object.isRequired,
  isEndOfSurah: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  options: OptionsShape.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      chapterId: PropTypes.string.isRequired,
    }),
  }).isRequired,
  verses: PropTypes.objectOf(VerseShape),
  isSingleVerse: PropTypes.bool.isRequired,
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
  lines: LineShape;
  options: OptionsShape;
  isSingleVerse: boolean;
  isEndOfChapter: boolean;
  isLoading: boolean;
  setCurrentVerse(verseKey: string): $TsFixMe;
  location: $TsFixMe;
};

class Chapter extends Component<Props> {
  public static propTypes = propTypes;
  public static defaultProps = defaultProps;

  fetchVerses = () => {
    const { match, fetchVerses, options, location } = this.props;
    const { params } = match;

    const chapterId = parseInt(params.chapterId, 10);
    const paging = determinePage(params.range);
    const translations =
      params.translations || (location && location.query.translations);

    if (__CLIENT__) {
      fetchVerses(chapterId, paging, { translations }, options);

      return null;
    }

    return fetchVerses(chapterId, paging, { translations }, options);
  };

  fetchChapters = () => {
    const { fetchChapters } = this.props;

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
    } = this.props;

    if (__CLIENT__) {
      fetchChapterInfo(params.chapterId, params.language);

      return null;
    }

    return fetchChapterInfo(params.chapterId, params.language);
  };

  bootstrap() {
    const promises = [
      this.fetchVerses(),
      this.fetchChapters(),
      this.fetchChapterInfo(),
    ];

    return Promise.all(promises);
  }

  handleLazyLoad = console.log;

  render() {
    const {
      chapter,
      verses,
      lines,
      options,
      match,
      setCurrentVerse,
      isLoading,
    } = this.props;

    const lastVerse: VerseShape = last(Object.values(verses));
    const isEndOfChapter: boolean =
      lastVerse.verseNumber === chapter.versesCount;
    const isSingleVerse =
      !!match.params.range && !match.params.range.includes('-');

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
                options.fontSize.arabic
              }rem;} .text-translation{font-size: ${
                options.fontSize.translation
              }rem;}`,
            },
          ]}
        />
        <PageContainer className="container-fluid">
          <div className="row">
            {/* <ChapterInfoPanelContainer chapter={chapter} /> */}
            <div className="col-md-10 col-md-offset-1">
              {__CLIENT__ && <TopOptions chapter={chapter} />}
              <Bismillah chapter={chapter} />
              {options.isReadingMode ? (
                <PageView lines={lines} />
              ) : (
                <ListView
                  chapter={chapter}
                  verses={verses}
                  isLoading={isLoading}
                />
              )}
            </div>
            <div className="col-md-10 col-md-offset-1">
              <ChapterPagination
                setCurrentVerse={setCurrentVerse}
                chapter={chapter}
                isSingleVerse={isSingleVerse}
                isEndOfChapter={isEndOfChapter}
                isLoading={isLoading}
                options={options}
                verses={verses}
                onLazyLoad={this.handleLazyLoad}
              />
            </div>
          </div>
        </PageContainer>

        {/* {__CLIENT__ && (
          <Audioplayer
            chapter={chapter}
            verses={verses}
            currentVerse={verses[currentVerse]}
            onLoadAyahs={this.handleLazyLoadAyahs}
          />
        )} */}
      </div>
    );
  }
}

export default Chapter;
