/* global Audio */
const AUDIO_CDN = '//audio.qurancdn.com/';

export function buildAudioURL(audio) {
  if (audio.url.startsWith('//')) return audio.url;

  return `${AUDIO_CDN}${audio.url}`;
}

export function buildAudioForAyah(audio) {
  const scopedAudio = new Audio();
  let segments = null;

  scopedAudio.preload = 'none';

  if (audio.url) {
    scopedAudio.src = buildAudioURL(audio);
    segments = audio.segments;
    return { audio: scopedAudio, segments };
  }

  return { audio: scopedAudio, segments };
}

export function buildAudioFromHash(ayahsObject = {}) {
  const audioFromHash = { files: {}, segments: {} };

  Object.keys(ayahsObject).forEach((ayahId) => {
    const ayah = ayahsObject[ayahId];
    const audioForAyah = buildAudioForAyah(ayah.audio);

    audioFromHash.files[ayahId] = audioForAyah.audio;
    audioFromHash.segments[ayahId] = audioForAyah.segments;
  });

  return audioFromHash;
}

export default function buildAudio(ayahs) {
  if (!ayahs.length) {
    return false;
  }

  return ayahs.map(ayah => buildAudioForAyah(ayah));
}
