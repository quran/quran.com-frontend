import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from 'quran-components/lib/Loader';
import { ChapterShape, VerseShape } from '../../shapes';
import T from '../T';
import LazyLoad from '../LazyLoad';
import { NUMBER_OF_CHAPTERS } from '../../constants';
import OptionsShape from '../../shapes/OptionsShape';

const propTypes = {
  chapter: ChapterShape.isRequired,
  setCurrentVerse: PropTypes.func.isRequired,
  isEndOfChapter: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  options: OptionsShape.isRequired,
  isSingleVerse: PropTypes.bool.isRequired,
  verses: PropTypes.objectOf(VerseShape).isRequired,
  onLazyLoad: PropTypes.func.isRequired,
};

type Props = {
  isSingleVerse: boolean;
  isLoading: boolean;
  isEndOfChapter: boolean;
  chapter: ChapterShape;
  verses: { [verseKey: string]: VerseShape };
  options: $TsFixMe;
  setCurrentVerse(verseKey: string): void;
  onLazyLoad(): void;
};

const loaderStyle = { position: 'relative', overflow: 'hidden' };

const ChapterPagination: React.SFC<Props> = ({
  isSingleVerse,
  isLoading,
  isEndOfChapter,
  chapter,
  options,
  setCurrentVerse,
  verses,
  onLazyLoad,
}: Props) => {
  const translations = (options.translations || []).join(',');
  const verseIds = Object.values(verses).map(
    (verse: VerseShape) => verse.verseNumber
  );
  const firstVerseId: number = verseIds[0];

  // If single verse, eh. /2/30
  if (isSingleVerse) {
    const to =
      firstVerseId + 10 > chapter.versesCount
        ? chapter.versesCount
        : firstVerseId + 10;

    return (
      <ul className="pager">
        <li className="text-center">
          <Link
            to={`/${
              chapter.chapterNumber
            }/${firstVerseId}-${to}?translations=${translations}`}
          >
            <T id="chapter.index.continue" defaultMessage="Continue" />
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <LazyLoad
      onLazyLoad={onLazyLoad}
      isEnd={isEndOfChapter && !isLoading}
      isLoading={isLoading}
      endComponent={
        <ul className="pager">
          {chapter.chapterNumber > 1 && (
            <li className="previous">
              <Link
                to={`/${Number(chapter.chapterNumber) -
                  1}?translations=${translations}`}
              >
                ←
                <T id="chapter.previous" defaultMessage="Previous Surah" />
              </Link>
            </li>
          )}
          <li className="text-center">
            <Link
              to={`/${chapter.chapterNumber}?translations=${translations}`}
              onClick={() =>
                setCurrentVerse(`${chapter.chapterNumber}:${firstVerseId}`)
              }
            >
              <T
                id="chapter.goToBeginning"
                defaultMessage="Beginning of Surah"
              />
            </Link>
          </li>
          {chapter.chapterNumber < NUMBER_OF_CHAPTERS && (
            <li className="next">
              <Link
                to={`/${Number(chapter.chapterNumber) +
                  1}?translations=${translations}`}
                onClick={() =>
                  setCurrentVerse(`${chapter.chapterNumber + 1}:1`)
                }
              >
                <T id="chapter.next" defaultMessage="Next Surah" />
                →
              </Link>
            </li>
          )}
        </ul>
      }
      loadingComponent={
        <Loader isActive={isLoading} relative style={loaderStyle} />
      }
    />
  );
};

ChapterPagination.propTypes = propTypes;

export default ChapterPagination;
