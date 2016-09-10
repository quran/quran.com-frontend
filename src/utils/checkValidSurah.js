export default function isValidSurah(nextState, replaceState) {
  const surahId = parseInt(nextState.params.surahId, 10);

  if (isNaN(surahId) || surahId > 114 || surahId < 1) {
    replaceState('/error/invalid-surah');
  }

  if (nextState.params.range) {
    if (nextState.params.range.includes('-')) {
      const [from, to] = nextState.params.range.split('-').map(num => parseInt(num, 10));
      if (from > to) {
        replaceState(`/${surahId}/${to}-${from}`);
      } else if (from === to) {
        replaceState(`/${surahId}/${from}`);
      }
      // TODO: Add check to make sure the range is within the ayah limit
    }
  }
}
