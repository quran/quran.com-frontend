export default function isValidSurah(nextState, replaceState) {
  const surahId = parseInt(nextState.params.surahId, 10);

  if (isNaN(surahId) || surahId > 114 || surahId < 1) {
    replaceState('/error/invalid-surah');
  }
}
