export default function isValidSurah(nextState, replaceState) {
  const chapterId = parseInt(nextState.params.chapterId, 10);

  if (isNaN(chapterId) || chapterId > 114 || chapterId < 1) {
    replaceState('/error/invalid-surah');
  }

  if (nextState.params.range) {
    if (nextState.params.range.includes('-')) {
      const [from, to] = nextState.params.range.split('-').map(num => parseInt(num, 10));

      if (from > to) {
        replaceState(`/${chapterId}/${to}-${from}`);
      } else if (from === to) {
        replaceState(`/${chapterId}/${from}`);
      }
      // TODO: Add check to make sure the range is within the ayah limit
    }
  }
}
