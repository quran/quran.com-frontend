import { chapterToVersesMap } from './constants';

const replaceChapterOrRange = (params) => {
  const chapterId = params.chapterId;
  const verseId = params.range;

  return (
    chapterId.length !== parseInt(chapterId, 10).toString().length ||
    (verseId && verseId.length !== parseInt(verseId, 10).toString().length)
  );
};

const filterValidChapter = (chapterId) => {
  if (isNaN(chapterId) || chapterId < 1 || chapterId > 114) {
    return { status: 400, url: '/error/invalid-surah' };
  }

  return null;
};

const filterValidVerse = (chapterId, verseRange) => {
  if (verseRange) {
    if (verseRange.includes('-')) {
      const [from, to] = verseRange.split('-').map(num => parseInt(num, 10));
      if (
        isNaN(from) ||
        isNaN(to) ||
        from < 1 ||
        to > chapterToVersesMap[chapterId]
      ) {
        return { status: 400, url: '/error/invalid-ayah' };
      }
    } else {
      const verseNumber = parseInt(verseRange, 10);

      if (verseNumber > chapterToVersesMap[chapterId]) {
        return { status: 400, url: '/error/invalid-ayah' };
      }
    }
  }

  return null;
};

const checkValidChapterOrVerse = ({ params, location }) => {
  const chapterId = parseInt(params.chapterId, 10);
  const invalidChapter = filterValidChapter(chapterId);

  if (invalidChapter) {
    return invalidChapter;
  }

  if (params.range) {
    if (params.range.includes('-')) {
      const [_from, _to] = params.range.split('-').map(num => num);
      const [from, to] = params.range.split('-').map(num => parseInt(num, 10));

      if (from > to) {
        return {
          status: 400,
          url: `/${chapterId}/${to}-${from}${location.search}`
        };
      } else if (from === to) {
        return { status: 400, url: `/${chapterId}/${from}` };
      } else if (
        _from.length !== from.toString().length ||
        _to.length !== to.toString().length
      ) {
        return {
          status: 400,
          url: `/${chapterId}/${from}-${to}${location.search}`
        };
      }
      // TODO: Add check to make sure the range is within the ayah limit
    } else {
      const verseId = parseInt(params.range, 10);

      if (replaceChapterOrRange(params)) {
        let scopedLocation = `${location.pathname}${location.search}`;
        scopedLocation = scopedLocation.replace(
          /\/([0-9]+)\/([0-9]+)/,
          `/${chapterId}/${verseId}`
        );

        return { status: 400, url: scopedLocation };
      }
    }
  } else if (replaceChapterOrRange(params)) {
    let scopedLocation = `${location.pathname}${location.search}`;

    scopedLocation = scopedLocation.replace(/\/([0-9]+)/, `/${chapterId}`);

    return { status: 400, url: scopedLocation };
  }

  return filterValidVerse(chapterId, params.range);
};

export default checkValidChapterOrVerse;
