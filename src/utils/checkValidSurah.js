export default function isValidSurah(nextState, replaceState) {
  let surahId = parseInt(nextState.params.surahId, 10)
  if(isNaN(surahId) || surahId > 114 || surahId < 1){

    replaceState(`/error/${nextState.params.surahId}`);
  }
}
