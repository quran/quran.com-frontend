import PropTypes from 'prop-types';
import ChapterInfoShape from './ChapterInfoShape';
import ChapterShape from './ChapterShape';
import ContentShape from './ContentShape';
import JuzShape from './JuzShape';
import LineShape from './LineShape';
import TafsirShape from './TafsirShape';
import TranslationShape from './TranslationShape';
import TransliterationShape from './TransliterationShape';
import UserShape from './UserShape';
import VerseShape from './VerseShape';
import WordShape from './WordShape';
import SegmentShape from './SegmentShape';
import SettingsShape from './SettingsShape';
import SuggestionShape from './SuggestionShape';
import FontSizeSettingShape from './FontSizeSettingShape';
import ReciterShape from './ReciterShape';
import RepeatShape from './RepeatShape';

export {
  ChapterInfoShape,
  ChapterShape,
  ContentShape,
  JuzShape,
  LineShape,
  TafsirShape,
  TranslationShape,
  TransliterationShape,
  UserShape,
  VerseShape,
  WordShape,
  SegmentShape,
  SettingsShape,
  FontSizeSettingShape,
  ReciterShape,
  RepeatShape,
  SuggestionShape,
};

export const bookmarkActions = PropTypes.shape({
  isLoaded: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  addBookmark: PropTypes.func.isRequired,
  removeBookmark: PropTypes.func.isRequired,
});

export const bookmarkType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  verseKey: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
});

export const footNoteType = PropTypes.shape({
  id: PropTypes.number,
  text: PropTypes.string,
  language_name: PropTypes.string,
});

export const media = PropTypes.shape({
  content: PropTypes.object,
});

export const mediaActions = PropTypes.shape({
  setMedia: PropTypes.func.isRequired,
  removeMedia: PropTypes.func.isRequired,
});

export const audioActions = PropTypes.shape({
  pause: PropTypes.func.isRequired,
  setVerse: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  setCurrentWord: PropTypes.func.isRequired,
});

export const language = PropTypes.shape({
  beta: PropTypes.bool,
  direction: PropTypes.string.isRequired,
  english: PropTypes.string.isRequired,
  esAnalyzerDefault: PropTypes.string,
  languageCode: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired,
  unicode: PropTypes.string,
});

export const matchType = PropTypes.shape({
  score: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  languageCode: PropTypes.string.isRequired,
  subType: PropTypes.string.isRequired,
  cardinalityType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  resourceId: PropTypes.number.isRequired,
  description: PropTypes.string,
  language: language.isRequired,
  sourceId: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool,
});

export const fontSize = PropTypes.shape({
  arabic: PropTypes.number,
  translations: PropTypes.number,
});

export const location = PropTypes.shape({
  action: PropTypes.string,
  hash: PropTypes.string,
  pathname: PropTypes.string,
  search: PropTypes.string,
  query: PropTypes.objectOf(PropTypes.string),
});

export const optionsType = PropTypes.shape({
  isReadingMode: PropTypes.bool,
  isShowingChapterInfo: PropTypes.bool,
  audio: PropTypes.number,
  quran: PropTypes.number,
  content: PropTypes.arrayOf(PropTypes.number),
  tooltip: PropTypes.string,
  fontSize: fontSize.isRequired,
});

export const recitationTypes = PropTypes.shape({
  id: PropTypes.number,
  style: PropTypes.string,
  reciter_name_eng: PropTypes.string,
});

export const match = PropTypes.arrayOf(matchType);

export const recitations = PropTypes.arrayOf(recitationTypes);

export const suggestion = PropTypes.shape({
  ayah: PropTypes.string,
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
});

export const suggestions = PropTypes.arrayOf(suggestion);

export const storeText = PropTypes.shape({
  ios: PropTypes.string.isRequired,
  android: PropTypes.string.isRequired,
  windows: PropTypes.string.isRequired,
  kindle: PropTypes.string.isRequired,
});
