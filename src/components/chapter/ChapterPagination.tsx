import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from 'quran-components/lib/Loader';
import { ChapterShape, VerseShape } from '../../shapes';
import T, { KEYS } from '../T';
import LazyLoad from '../LazyLoad';
import { NUMBER_OF_CHAPTERS } from '../../constants';
import SettingsShape from '../../shapes/SettingsShape';

const propTypes = {
  chapter: ChapterShape.isRequired,
  isEndOfChapter: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  settings: SettingsShape.isRequired,
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
  settings: SettingsShape;
  onLazyLoad(): void;
};

const loaderStyle = { position: 'relative', overflow: 'hidden' };

const ChapterPagination: React.SFC<Props> = ({
  isSingleVerse,
  isLoading,
  isEndOfChapter,
  chapter,
  settings,
  verses,
  onLazyLoad,
}: Props) => {
  const translations = (settings.translations || []).join(',');
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
            <T id={KEYS.CHAPTER_INDEX_CONTINUE} />
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
                <T id={KEYS.CHAPTER_PREVIOUS} />
              </Link>
            </li>
          )}
          <li className="text-center">
            <Link to={`/${chapter.chapterNumber}?translations=${translations}`}>
              <T id={KEYS.CHAPTER_GOTOBEGINNING} />
            </Link>
          </li>
          {chapter.chapterNumber < NUMBER_OF_CHAPTERS && (
            <li className="next">
              <Link
                to={`/${Number(chapter.chapterNumber) +
                  1}?translations=${translations}`}
              >
                <T id={KEYS.CHAPTER_NEXT} />
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
