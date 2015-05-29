export function changeAyah(actionContxt, payload, done) {
  actionContxt.dispatch('audioplayerAyahChange', {
    ayah: payload.ayah,
    shouldPlay: payload.shouldPlay || false
  });
}
