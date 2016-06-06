export function testIfSupported(ayah, agent) {
  const { audio } = ayah;

  const testOperaOrFirefox = (agent.isOpera || agent.isFirefox);
  const testChrome = agent.isChrome;

  if(!audio) {
    return false;
  }

  if (testOperaOrFirefox) {
    if (!(audio.ogg && audio.ogg.url)) {
      return false;
    }
  }
  else {
    if (audio.mp3 && audio.mp3.url) {
      return true;
    }
    else if (audio.ogg && audio.ogg.url) {
      if (!testChrome) {
        return false;
      }
    }
    else {
      return false;
    }
  }

  return true;
}

export function buildAudioForAyah(audio, agent) {
  let scopedAudio = new Audio(), segments = null;

  scopedAudio.preload = 'none';

  const testOperaOrFirefox = (agent.isOpera || agent.isFirefox);
  const testChrome = agent.isChrome;


  if (testOperaOrFirefox) {
    if (audio.ogg && audio.ogg.url) {
      scopedAudio.src = audio.ogg.url;
      segments = audio.ogg.encryptedSegments;
    }
  }
  else {
    if (audio.mp3 && audio.mp3.url) {
      scopedAudio.src = audio.mp3.url;
      segments = audio.mp3.encryptedSegments;
    }
    else if (audio.ogg && audio.ogg.url) {
      if (testChrome) {
        scopedAudio.src = audio.ogg.url;
        segments = audio.ogg.encryptedSegments;
      }
    }
  }

  return { audio: scopedAudio, segments };
}

export function buildAudioFromHash(ayahsObject = {}, agent) {
  const audioFromHash = {files: {}, segments: {}};

  Object.keys(ayahsObject).forEach(ayahId => {
    const ayah = ayahsObject[ayahId];
    const audioForAyah = buildAudioForAyah(ayah.audio, agent);

    audioFromHash.files[ayahId] = audioForAyah.audio;
    audioFromHash.segments[ayahId] = audioForAyah.segments;
  });

  return audioFromHash;
}


export default function buildAudio(ayahs) {
  if (!~~ayahs.length) {
    return;
  }

  return ayahs.map(ayah => {
    return buildAudioForAyah(ayah);
  });
}
