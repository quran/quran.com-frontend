import { VerseShape } from '../shapes';

export const buildSegments = (segments: $TsFixMe) => {
  const words: { [key: string]: $TsFixMe } = {};
  const intervals = segments.map((segment: $TsFixMe) => {
    const startTime = segment[2];
    const endTime = segment[3];
    const duration = segment[3] - segment[2];
    const wordIndex = segment[0];
    const mappedVal = {
      startTime: startTime / 1000,
      endTime: endTime / 1000,
      duration: duration / 1000,
    };

    if (wordIndex >= 0 && !words[wordIndex]) {
      words[wordIndex] = mappedVal;
    }

    return [startTime / 1000, endTime / 1000, wordIndex];
  });

  return { words, intervals };
};

export const extractSegments = (verses: { [verseKey: string]: VerseShape }) => {
  const segments: { [verseKey: string]: $TsFixMe } = {};

  if (verses) {
    Object.values(verses).forEach((verse: VerseShape) => {
      if (verse.audio) {
        if (verse.audio.segments) {
          segments[verse.verseKey] = buildSegments(verse.audio.segments);
        }
      }
    });
  }

  return segments;
};
