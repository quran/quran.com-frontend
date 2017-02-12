export function isLoaded(globalState, chapterId, from, to) {
  return (
  globalState.verses.entities[chapterId] &&
  globalState.verses.entities[chapterId][`${chapterId}:${from}`] &&
  globalState.verses.entities[chapterId][`${chapterId}:${to}`]
  );
}
export { default as debug } from './debug';
