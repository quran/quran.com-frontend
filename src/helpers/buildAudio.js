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
  let scopedAudio;

  const testOperaOrFirefox = __SERVER__ ?
    (agent.isOpera || agent.isFirefox) :
    (opera.test(window.navigator.userAgent) || firefox.test(window.navigator.userAgent));
  const testChrome = __SERVER__ ? agent.isChrome : chrome.test(window.navigator.userAgent);

  scopedAudio = new Audio();
  scopedAudio.preload = 'none';

  if (audio.mp3.url && /AbdulBaset\/Murattal/.test(audio.mp3.url)) {
    const filename = audio.mp3.url.replace(/^.*\/mp3\//, '');
    audio.mp3.url = `http://mirrors.quranicaudio.com/everyayah/Abdul_Basit_Murattal_64kbps/${filename}`;
  }

  if (testOperaOrFirefox) {
    if (audio.ogg.url) {
      scopedAudio.src = audio.ogg.url;
    }
  }
  else {
    if (audio.mp3.url) {
      scopedAudio.src = audio.mp3.url;
    }
    else if (audio.ogg.url) {
      if (testChrome) {
        scopedAudio.src = audio.ogg.url;
      }
    }
  }

  return scopedAudio;
}

export function buildAudioFromHash(ayahsObject = {}, agent) {
  const filesObject = {files: {}, segments: {}};

  Object.keys(ayahsObject).forEach(ayahId => {
    const ayah = ayahsObject[ayahId];

    filesObject.files[ayahId] = buildAudioForAyah(ayah.audio, agent);
    if (ayah.audio.segments) {
      filesObject.segments[ayahId] = ayah.audio.segments;
    }
  });

  console.log('buildAudioFromHash', { ayahsObject, filesObject });
  return filesObject;
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
