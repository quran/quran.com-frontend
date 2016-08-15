export function testIfSupported(ayah) {
  const { audio } = ayah;
  if (!audio) {
    return false;
  }
  return true;
}

export function buildAudioForAyah(audio) {
  const scopedAudio = new Audio();
  let segments = null;

  scopedAudio.preload = 'none';
  if (audio.url) {
    scopedAudio.src = audio.url;
    segments = audio.encryptedSegments;
  }

  return { audio: scopedAudio, segments };
}

export function buildAudioFromHash(ayahsObject = {}) {
  const audioFromHash = {files: {}, segments: {}};

  Object.keys(ayahsObject).forEach(ayahId => {
    const ayah = ayahsObject[ayahId];
    const audioForAyah = buildAudioForAyah(ayah.audio);

    audioFromHash.files[ayahId] = audioForAyah.audio;
    audioFromHash.segments[ayahId] = audioForAyah.segments;
  });

  return audioFromHash;
}


export default function buildAudio(ayahs) {
  if (!~~ayahs.length) {
    return false;
  }

  return ayahs.map(ayah => buildAudioForAyah(ayah));
}
