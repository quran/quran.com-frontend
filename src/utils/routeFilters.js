function replaceChapterOrRange(params) {
  const chapterId = params.chapterId;
  const verseId = params.range;

  return (
    chapterId.length !== parseInt(chapterId, 10).toString().length ||
    (verseId && verseId.length !== parseInt(verseId, 10).toString().length)
  );
}

export default function isValidSurah(nextState, replaceState) {
  const chapterId = parseInt(nextState.params.chapterId, 10);
  if (isNaN(chapterId) || chapterId > 114 || chapterId < 1) {
    replaceState('/error/invalid-surah');
  }

  if (nextState.params.range) {
    if (nextState.params.range.includes('-')) {
      const [_from, _to] = nextState.params.range.split('-').map(num => num);
      const [from, to] = nextState.params.range
        .split('-')
        .map(num => parseInt(num, 10));

      if (from > to) {
        replaceState(`/${chapterId}/${to}-${from}${nextState.location.search}`);
      } else if (from === to) {
        replaceState(`/${chapterId}/${from}`);
      } else if (
        _from.length !== from.toString().length ||
        _to.length !== to.toString().length
      ) {
        replaceState(`/${chapterId}/${from}-${to}${nextState.location.search}`);
      }
      // TODO: Add check to make sure the range is within the ayah limit
    } else {
      const verseId = parseInt(nextState.params.range, 10);

      if (replaceChapterOrRange(nextState.params)) {
        let location = `${nextState.location.pathname}${nextState.location.search}`;
        location = location.replace(
          /\/([0-9]+)\/([0-9]+)/,
          `/${chapterId}/${verseId}`
        );
        replaceState(location);
      }
    }
  } else if (replaceChapterOrRange(nextState.params)) {
    let location = `${nextState.location.pathname}${nextState.location.search}`;
    location = location.replace(/\/([0-9]+)/, `/${chapterId}`);
    replaceState(location);
  }
}
