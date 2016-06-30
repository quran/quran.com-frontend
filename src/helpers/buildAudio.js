import { decrypt } from 'sjcl';

export function testIfSupported(ayah, agent) {
  const { audio } = ayah;

  const testOperaOrFirefox = (agent.isOpera || agent.isFirefox);
  const testChrome = agent.isChrome;

  if (!audio) {
    return false;
  }

  if (testOperaOrFirefox) {
    if (!(audio.ogg && audio.ogg.url)) {
      return false;
    }
  } else {
    if (audio.mp3 && audio.mp3.url) {
      return true;
    } else if (audio.ogg && audio.ogg.url) {
      if (!testChrome) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
}

export function buildSegments(segments) {
  let parsedSegments = null;

  try {
    parsedSegments = JSON.parse(
      decrypt(
        process.env.SEGMENTS_KEY,
        new Buffer(segments, 'base64').toString()
      )
    );
  } catch (e) {
    parsedSegments = [];
  }

  const words = {};
  const intervals = parsedSegments.map(segment => {
    const startTime = segment[0];
    const endTime = segment[0] + segment[1];
    const duration = segment[1];
    const wordIndex = segment[2];
    const mappedVal = {
      startTime: startTime / 1000,
      endTime: endTime / 1000,
      duration: duration / 1000
    };

    if (wordIndex >= 0 && !words[wordIndex]) {
      words[wordIndex] = mappedVal;
    }

    return [startTime / 1000, endTime / 1000, wordIndex];
  });

  return { words, intervals };
}

export function buildAudioForAyah(audio, agent) {
  const scopedAudio = new Audio();
  let segments = null;

  scopedAudio.preload = 'none';

  const testOperaOrFirefox = (agent.isOpera || agent.isFirefox);
  const testChrome = agent.isChrome;


  if (testOperaOrFirefox) {
    if (audio.ogg && audio.ogg.url) {
      scopedAudio.src = audio.ogg.url;
      segments = audio.ogg.encryptedSegments;
    }
  } else {
    if (audio.mp3 && audio.mp3.url) {
      scopedAudio.src = audio.mp3.url;
      segments = audio.mp3.encryptedSegments;
    } else if (audio.ogg && audio.ogg.url) {
      if (testChrome) {
        scopedAudio.src = audio.ogg.url;
        segments = audio.ogg.encryptedSegments;
      }
    }
  }


  return { audio: scopedAudio, segments: buildSegments(segments) };
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
    return false;
  }

  return ayahs.map(ayah => buildAudioForAyah(ayah));
}
