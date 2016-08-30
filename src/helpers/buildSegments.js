import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

import debug from 'helpers/debug';

export const buildSegments = (segments) => {
  let parsedSegments = null;
  debug('helper:buildSegments', 'init');

  try {
    parsedSegments = JSON.parse(
      AES.decrypt(segments, process.env.SEGMENTS_KEY).toString(Utf8)
    );
  } catch (e) {
    parsedSegments = [];
  }

  debug('helper:buildSegments', 'finish');

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
};


export const extractSegments = (ayahs) => {
  const segments = {};

  Object.values(ayahs).forEach((ayah, index) => {
    if (ayah.audio) {
      if (ayah.audio.encryptedSegments) {
        segments[ayah.ayahKey] = ayah.audio.encryptedSegments;
      }
    }

    if (index === 0 && segments[ayah.ayahKey]) {
      segments[ayah.ayahKey] = buildSegments(segments[ayah.ayahKey]); // prebuild the first one
    }
  });

  return segments;
};
