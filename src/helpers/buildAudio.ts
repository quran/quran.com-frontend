/* global Audio */
import config from '../../config';
import { VerseShape } from '../shapes';

export function buildAudioURL(audio: $TsFixMe) {
  if (audio.url.startsWith('//')) return audio.url;

  return `${config('audioCDN')}/${audio.url}`;
}

export function buildAudioForVerse(audio: $TsFixMe) {
  const scopedAudio = new Audio();

  scopedAudio.preload = 'none';

  if (audio.url) {
    scopedAudio.src = buildAudioURL(audio);
    const { segments } = audio.segments;

    return { audio: scopedAudio, segments };
  }

  return { audio: scopedAudio, segments: null };
}

export function buildAudioFromHash(
  versesObject = {} as { [verseKey: string]: VerseShape }
) {
  const audioFromHash: $TsFixMe = { files: {}, segments: {} };

  Object.keys(versesObject).forEach(verseId => {
    const verse: VerseShape = versesObject[verseId];
    const audioForAyah: $TsFixMe = buildAudioForVerse(verse.audio);

    audioFromHash.files[verseId] = audioForAyah.audio;
    audioFromHash.segments[verseId] = audioForAyah.segments;
  });

  return audioFromHash;
}

export default function buildAudio(verses: Array<VerseShape>) {
  if (!verses.length) {
    return null;
  }

  return verses.map(verse => buildAudioForVerse(verse));
}
