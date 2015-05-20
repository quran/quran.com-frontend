export function changeAyah(actionContxt, nextAyah, shouldPlay) {
  dispatcher.dispatch('currentAyahChanged', {
    nextAyah: nextAyah,
    shouldPlay: shouldPlay
  });
}
