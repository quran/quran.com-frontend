import PropTypes from 'prop-types';

export const bookmarkActions = PropTypes.shape({
  isLoaded: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  addBookmark: PropTypes.func.isRequired,
  removeBookmark: PropTypes.func.isRequired
});

export const bookmarkType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  verseKey: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired
});

export const contentType = PropTypes.shape({
  id: PropTypes.number,
  authorName: PropTypes.string,
  languageName: PropTypes.string
});

export const footNoteType = PropTypes.shape({
  id: PropTypes.number,
  text: PropTypes.string,
  language_name: PropTypes.string
});

export const infoType = PropTypes.shape({
  chapterId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  shortText: PropTypes.string.isRequired,
  languageName: PropTypes.string.isRequired
});

export const media = PropTypes.shape({
  content: PropTypes.object
});

export const mediaActions = PropTypes.shape({
  setMedia: PropTypes.func.isRequired,
  removeMedia: PropTypes.func.isRequired
});

export const audioActions = PropTypes.shape({
  pause: PropTypes.func.isRequired,
  setAyah: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  setCurrentWord: PropTypes.func.isRequired
});

export const language = PropTypes.shape({
  beta: PropTypes.bool,
  direction: PropTypes.string.isRequired,
  english: PropTypes.string.isRequired,
  esAnalyzerDefault: PropTypes.string,
  languageCode: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired,
  unicode: PropTypes.string
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
  isAvailable: PropTypes.bool
});

export const fontSize = PropTypes.shape({
  arabic: PropTypes.number,
  translations: PropTypes.number
});

export const location = PropTypes.shape({
  action: PropTypes.string,
  hash: PropTypes.string,
  pathname: PropTypes.string,
  search: PropTypes.string,
  query: PropTypes.objectOf(PropTypes.string)
});

export const optionsType = PropTypes.shape({
  isReadingMode: PropTypes.bool,
  isShowingSurahInfo: PropTypes.bool,
  audio: PropTypes.number,
  quran: PropTypes.number,
  content: PropTypes.arrayOf(PropTypes.number),
  tooltip: PropTypes.string,
  fontSize: fontSize.isRequired
});

export const recitationTypes = PropTypes.shape({
  id: PropTypes.number,
  style: PropTypes.string,
  reciter_name_eng: PropTypes.string
});

export const surahType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  versesCount: PropTypes.number.isRequired,
  bismillahPre: PropTypes.bool.isRequired,
  revelationOrder: PropTypes.number.isRequired,
  revelationPlace: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.number).isRequired,
  nameComplex: PropTypes.string.isRequired,
  nameSimple: PropTypes.string.isRequired,
  nameArabic: PropTypes.string.isRequired
});

export const juzType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  juzNumber: PropTypes.number.isRequired,
  nameArabic: PropTypes.string,
  nameSimple: PropTypes.string,
  verseMapping: PropTypes.object
});

export const timeInterval = PropTypes.shape({
  from: PropTypes.number,
  to: PropTypes.number,
  time: PropTypes.number
});

export const translationType = PropTypes.shape({
  languageName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired
});

export const translation = PropTypes.shape({
  languageName: PropTypes.string,
  text: PropTypes.string
});

export const transliteration = PropTypes.shape({
  languageName: PropTypes.string,
  text: PropTypes.string
});

export const translationOptions = PropTypes.arrayOf(contentType);

export const userType = PropTypes.shape({
  provider: PropTypes.string,
  uid: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  username: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string
});

export const wordType = PropTypes.shape({
  arabic: PropTypes.string,
  verseKey: PropTypes.string.isRequired,
  charType: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  lineNumber: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  translation,
  transliteration,
  wordId: PropTypes.number
});

export const verseType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  chapterId: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  juzNumber: PropTypes.number.isRequired,
  hizbNumber: PropTypes.number.isRequired,
  rubNumber: PropTypes.number.isRequired,
  verseKey: PropTypes.string.isRequired,
  sajdah: PropTypes.bool,
  words: PropTypes.arrayOf(wordType).isRequired,
  textMadani: PropTypes.string.isRequired,
  textSimple: PropTypes.string.isRequired,
  translations: PropTypes.arrayOf(translationType), // NOTE: In search, it is not required.
  audio: PropTypes.object // NOTE: In search, it is not required.
});

export const verses = PropTypes.objectOf(verseType);

export const tafsirType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  verseKey: PropTypes.string.isRequired,
  verseId: PropTypes.number.isRequired,
  languageName: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired
});

export const words = PropTypes.shape({
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired
});

export const segmentType = PropTypes.shape({
  words,
  // eslint-disable-next-line max-len
  intervals: PropTypes.oneOfType([PropTypes.array, PropTypes.object]) // TODO: This should be done a better way.
});

export const segments = PropTypes.objectOf(segmentType);

export const match = PropTypes.arrayOf(matchType);

export const chapters = PropTypes.objectOf(surahType);

export const juzs = PropTypes.objectOf(juzType);

export const line = PropTypes.arrayOf(wordType);

export const recitations = PropTypes.arrayOf(recitationTypes);

export const suggestion = PropTypes.shape({
  ayah: PropTypes.string,
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
});

export const suggestions = PropTypes.arrayOf(suggestion);

export const storeText = PropTypes.shape({
  ios: PropTypes.string.isRequired,
  android: PropTypes.string.isRequired,
  windows: PropTypes.string.isRequired,
  kindle: PropTypes.string.isRequired
});
