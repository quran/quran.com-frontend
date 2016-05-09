/* eslint-disable */
const firefox = /firefox/i;
const opera = /opera/i;
const chrome = /chrome/i;

export function testIfSupported(ayah, agent) {
  const { audio } = ayah;

  const testOperaOrFirefox = __SERVER__ ?
    (agent.isOpera || agent.isFirefox) :
    (opera.test(window.navigator.userAgent) || firefox.test(window.navigator.userAgent));
  const testChrome = __SERVER__ ? agent.isChrome : chrome.test(window.navigator.userAgent);

  if(!audio) {
    return false;
  }

  if (testOperaOrFirefox) {
    if (!audio.ogg.url) {
      return false;
    }
  }
  else {
    if (audio.mp3.url) {
      return true;
    }
    else if (audio.ogg.url) {
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

  const testOperaOrFirefox = __SERVER__ ?
    (agent.isOpera || agent.isFirefox) :
    (opera.test(window.navigator.userAgent) || firefox.test(window.navigator.userAgent));
  const testChrome = __SERVER__ ? agent.isChrome : chrome.test(window.navigator.userAgent);

  if (testOperaOrFirefox) {
    if (audio.ogg.url) {
      scopedAudio.src = audio.ogg.url;
      segments = audio.ogg.segments;
    }
  }
  else {
    if (audio.mp3.url) {
      scopedAudio.src = audio.mp3.url;
      segments = audio.mp3.segments;
    }
    else if (audio.ogg.url) {
      if (testChrome) {
        scopedAudio.src = audio.ogg.url;
        segments = audio.ogg.segments;
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

  // const errorMessage = 'The current reciter does not have audio that suits' +
  //                   ' your browser. Either select another reciter or try' +
  //                   ' on another browser.';

  return ayahs.map(ayah => {
    return buildAudioForAyah(ayah);
  });
}
