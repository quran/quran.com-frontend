export function isLoaded(globalState, surahId, from, to) {
  return (
  globalState.ayahs.entities[surahId] &&
  globalState.ayahs.entities[surahId][`${surahId}:${from}`] &&
  globalState.ayahs.entities[surahId][`${surahId}:${to}`]
  );
}
export { default as debug } from './debug';
