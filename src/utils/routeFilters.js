import { chapterToVersesMap } from '../constants';

export const INVALID_VERSE_URL = '/error/invalid-ayah';
export const INVALID_CHAPTER_URL = '/error/invalid-surah';

const REDIRECT_STATUS = 301;
const BAD_REQUEST_STATUS = 400;

const replaceChapterOrRange = ({ chapterId, verseId }) =>
  chapterId.length !== parseInt(chapterId, 10).toString().length ||
  (verseId && verseId.length !== parseInt(verseId, 10).toString().length);

const validateChapter = ({ params: { chapterId }, location }) => {
  if (isNaN(parseInt(chapterId, 10))) {
    return { status: BAD_REQUEST_STATUS, url: INVALID_CHAPTER_URL };
  }

  if (parseInt(chapterId, 10) < 1 || parseInt(chapterId, 10) > 114) {
    return { status: BAD_REQUEST_STATUS, url: INVALID_CHAPTER_URL };
  }

  if (location.pathname.match(/\b0+/g)) {
    return {
      status: REDIRECT_STATUS,
      url: location.pathname.replace(/\b0+/g, '')
    };
  }

  return null;
};

const validateVerse = ({ params: { chapterId, range } }) => {
  if (range) {
    if (!range.includes('-') && !range.includes(':')) {
      // range is just a verse number
      if (isNaN(range)) {
        return { status: BAD_REQUEST_STATUS, url: INVALID_VERSE_URL };
      }

      const verseNumber = parseInt(range, 10);

      if (verseNumber > chapterToVersesMap[chapterId]) {
        return { status: BAD_REQUEST_STATUS, url: INVALID_VERSE_URL };
      }
    }
  }

  return null;
};

const validateRange = ({ params, location }) => {
  const chapterId = params.chapterId;
  const range = params.range;
  const splitter = params['0'];

  if (splitter) {
    return {
      status: REDIRECT_STATUS,
      url: `/${chapterId}/${range}`
    };
  }

  if (range) {
    // Maybe use:
    // range.match(/\d+:\d+$/g)

    if (range.includes('-') || range.includes(':')) {
      const splitType = range.includes('-') ? '-' : ':';
      const [_from, _to] = range.split(splitType).map(num => num);
      const [from, to] = range.split(splitType).map(num => parseInt(num, 10));

      if (
        isNaN(from) ||
        isNaN(to) ||
        from < 1 ||
        to > chapterToVersesMap[chapterId]
      ) {
        return { status: BAD_REQUEST_STATUS, url: INVALID_VERSE_URL };
      }

      if (from === to) {
        return { status: REDIRECT_STATUS, url: `/${chapterId}/${from}` };
      }

      if (from > to) {
        return { status: REDIRECT_STATUS, url: `/${chapterId}/${to}-${from}` };
      }

      if (
        _from.length !== from.toString().length ||
        _to.length !== to.toString().length
      ) {
        return {
          status: REDIRECT_STATUS,
          url: `/${chapterId}/${from}-${to}${location.search}`
        };
      }

      if (range.includes(':')) {
        return {
          status: REDIRECT_STATUS,
          url: `/${chapterId}/${range.replace(':', '-')}${
            location.search ? location.search : ''
          }`
        };
      }
    }

    if (location.pathname.match(/\b0+/g)) {
      return {
        status: REDIRECT_STATUS,
        url: location.pathname.replace(/\b0+/g, '')
      };
    }
  }

  return null;
};

const validateRangeLimit = ({ params, location }) => {
  const chapterId = parseInt(params.chapterId, 10);

  // TODO: Add check to make sure the range is within the ayah limit
  if (replaceChapterOrRange(params)) {
    let scopedLocation = `${location.pathname}${location.search}`;

    scopedLocation = scopedLocation.replace(/\/([0-9]+)/, `/${chapterId}`);

    return { status: REDIRECT_STATUS, url: scopedLocation };
  }

  return null;
};

const validateEmptyRange = ({ location }) => {
  if (location.pathname.match(/\/\d+:$/g)) {
    return {
      status: REDIRECT_STATUS,
      url: location.pathname.replace(':', '')
    };
  }

  return null;
};

const validators = [
  validateChapter,
  validateEmptyRange,
  validateVerse,
  validateRange,
  validateRangeLimit
];

const validate = ({ params, location }) => {
  /*
   validation & redirection rules

   /2:2 => /2/2
   /2:2:3 => 1/2-3
   /2-2-3 => 1/2-3
   /1-1 => /1/1
   /002 => /2
   /002/002 => /2/2
   /02:02 => /2:2
   /2/20-2 => 2/2-20
   /2:20:2 => /2/2-20
   /120 => invalid-surah
   /1/8 => invalid ayah

  */
  const trigger = validators.find(validator => validator({ params, location }));

  if (trigger) {
    return trigger({ params, location });
  }

  return null;
};

export default validate;
