export const buildSegments = (segments) => {
  const words = {};
  const intervals = segments.map((segment) => {
    const startTime = segment[2];
    const endTime = segment[3];
    const duration = segment[3] - segment[2];
    const wordIndex = segment[0];
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

  Object.values(ayahs).forEach((ayah) => {
    if (ayah.audio) {
      if (ayah.audio.segments) {
        segments[ayah.ayahKey] = buildSegments(ayah.audio.segments);
      }
    }
  });

  return segments;
};
