import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import makeHelmetTags from '../../helpers/makeHelmetTags';
import { chapterLdJson } from '../../helpers/ldJson';
import {
  ChapterShape,
  ChapterInfoShape,
  VerseShape,
  SettingsShape,
} from '../../shapes';

const makeTitle = ({
  chapter,
  params,
}: {
  chapter: ChapterShape;
  params: $TsFixMe;
}) => {
  if (params.range) {
    return `Surah ${chapter.nameSimple} [${chapter.chapterNumber}:${
      params.range
    }]`;
  }

  return `Surah ${chapter.nameSimple} [${chapter.chapterNumber}] - ${
    chapter.translatedName.name
  }`;
};

const makeDescription = ({
  chapter,
  verses,
  chapterInfo,
  params,
}: {
  chapter: ChapterShape;
  chapterInfo: ChapterInfoShape;
  verses: { [verseKey: string]: VerseShape };
  params: $TsFixMe;
}) => {
  if (params.range) {
    if (params.range.includes('-')) {
      return `Surah ${chapter.nameSimple} [verse ${params.range}]`;
    }

    const verse = verses[`${chapter.chapterNumber}:${params.range}`];

    if (verse && verse.translations && verse.translations[0]) {
      return `Surah ${chapter.nameSimple} [verse ${params.range}] - ${
        verse.translations[0].text
      }`;
    }

    return `Surah ${chapter.nameSimple} [verse ${params.range}]`;
  }

  return `${chapterInfo ? chapterInfo.shortText : ''} This Surah has ${
    chapter.versesCount
  } ayah and resides between pages ${chapter.pages[0]} to ${
    chapter.pages[1]
  } in the Holly Quran.`;
};

const propTypes = {
  chapter: ChapterShape.isRequired,
  chapterInfo: ChapterInfoShape.isRequired,
  settings: SettingsShape.isRequired,
  verses: PropTypes.objectOf(VerseShape).isRequired,
  params: PropTypes.object.isRequired,
};

type Props = {
  chapter: ChapterShape;
  chapterInfo: ChapterInfoShape;
  settings: SettingsShape;
  verses: { [verseKey: string]: VerseShape };
  params: $TsFixMe;
};

const ChapterHelmet: React.SFC<Props> = ({
  chapter,
  settings,
  chapterInfo,
  verses,
  params,
}: Props) => (
  <Helmet
    {...makeHelmetTags({
      // TODO: add this
      title: makeTitle({ chapter, params }),
      description: makeDescription({ chapter, chapterInfo, verses, params }),
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
);

ChapterHelmet.propTypes = propTypes;

export default ChapterHelmet;
