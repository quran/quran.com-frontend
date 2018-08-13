import toNumber from 'lodash/toNumber';
import isInteger from 'lodash/isInteger';
import { CHAPTERS_TO_VERSES, HTTP_STATUS_CODES } from '../constants';

export const INVALID_VERSE_URL = '/error/ERROR_INVALID_VERSE';
export const INVALID_CHAPTER_URL = '/error/ERROR_INVALID_CHAPTER';

type RouteArgs = {
  params: { chapterId?: string; range?: string; verseId?: string };
  location: $TsFixMe;
};

const replaceChapterOrRange = ({
  chapterId,
  verseId,
}: {
  chapterId?: string;
  verseId?: string;
}) =>
  chapterId.length !== toNumber(chapterId).toString().length ||
  (verseId && verseId.length !== toNumber(verseId).toString().length);

const validateChapter = ({ params: { chapterId }, location }: RouteArgs) => {
  const chapterIdNumber = toNumber(chapterId);

  if (!isInteger(chapterIdNumber)) {
    return { status: HTTP_STATUS_CODES.BAD_REQUEST, url: INVALID_CHAPTER_URL };
  }

  if (chapterIdNumber < 1 || chapterIdNumber > 114) {
    return { status: HTTP_STATUS_CODES.BAD_REQUEST, url: INVALID_CHAPTER_URL };
  }

  if (location.pathname.match(/\b0+/g)) {
    return {
      status: HTTP_STATUS_CODES.REDIRECT,
      url: location.pathname.replace(/\b0+/g, ''),
    };
  }

  return null;
};

const validateVerse = ({ params: { chapterId, range } }: RouteArgs) => {
  if (range) {
    if (!range.includes('-') && !range.includes(':')) {
      // range is just a verse number
      if (!isInteger(toNumber(range))) {
        return {
          status: HTTP_STATUS_CODES.BAD_REQUEST,
          url: INVALID_VERSE_URL,
        };
      }

      const verseNumber = toNumber(range);

      if (verseNumber > CHAPTERS_TO_VERSES[chapterId]) {
        return {
          status: HTTP_STATUS_CODES.BAD_REQUEST,
          url: INVALID_VERSE_URL,
        };
      }
    }
  }

  return null;
};

const validateRange = ({ params, location }: RouteArgs) => {
  const { chapterId, range } = params;

  if (range) {
    // Maybe use:
    // range.match(/\d+:\d+$/g)

    if (range.includes('-') || range.includes(':')) {
      const splitType = range.includes('-') ? '-' : ':';
      const [_from, _to] = range.split(splitType).map(num => num);
      const [from, to] = range.split(splitType).map(num => toNumber(num));

      if (
        isNaN(from) ||
        isNaN(to) ||
        from < 1 ||
        to > CHAPTERS_TO_VERSES[chapterId]
      ) {
        return {
          status: HTTP_STATUS_CODES.BAD_REQUEST,
          url: INVALID_VERSE_URL,
        };
      }

      if (from === to) {
        return {
          status: HTTP_STATUS_CODES.REDIRECT,
          url: `/${chapterId}/${from}`,
        };
      }

      if (from > to) {
        return {
          status: HTTP_STATUS_CODES.REDIRECT,
          url: `/${chapterId}/${to}-${from}`,
        };
      }

      if (
        _from.length !== from.toString().length ||
        _to.length !== to.toString().length
      ) {
        return {
          status: HTTP_STATUS_CODES.REDIRECT,
          url: `/${chapterId}/${from}-${to}${location.search}`,
        };
      }

      if (range.includes(':')) {
        return {
          status: HTTP_STATUS_CODES.REDIRECT,
          url: `/${chapterId}/${range.replace(':', '-')}${
            location.search ? location.search : ''
          }`,
        };
      }
    }

    if (location.pathname.match(/\b0+/g)) {
      return {
        status: HTTP_STATUS_CODES.REDIRECT,
        url: location.pathname.replace(/\b0+/g, ''),
      };
    }
  }

  return null;
};

const validateRangeLimit = ({ params, location }: RouteArgs) => {
  const chapterId = toNumber(params.chapterId);

  // TODO: Add check to make sure the range is within the ayah limit
  if (replaceChapterOrRange(params)) {
    let scopedLocation = `${location.pathname}${location.search}`;

    scopedLocation = scopedLocation.replace(/\/([0-9]+)/, `/${chapterId}`);

    return { status: HTTP_STATUS_CODES.REDIRECT, url: scopedLocation };
  }

  return null;
};

const validateEmptyRange = ({ location }: RouteArgs) => {
  if (location.pathname.match(/\/\d+:$/g)) {
    return {
      status: HTTP_STATUS_CODES.REDIRECT,
      url: location.pathname.replace(':', ''),
    };
  }

  return null;
};

const validators = [
  validateChapter,
  validateEmptyRange,
  validateVerse,
  validateRange,
  validateRangeLimit,
];

const validate = ({ params, location }: RouteArgs) => {
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
  const trigger = validators.find(
    validator => validator({ params, location }) as $TsFixMe
  );

  if (trigger) {
    return trigger({ params, location });
  }

  return null;
};

export default validate;
