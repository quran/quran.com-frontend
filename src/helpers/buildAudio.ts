/* global Audio */
import config from '../../config';
import { VerseShape } from '../shapes';

export function buildAudioURL(audio: $TsFixMe) {
  if (audio.url.startsWith('//')) return audio.url;

  return `${config('audioCDN')}/${audio.url}`;
}

export function buildAudioForVerse(audio: $TsFixMe, preload: string = 'none') {
  const scopedAudio = new Audio();

  scopedAudio.preload = preload;

  if (audio.url) {
    scopedAudio.src = buildAudioURL(audio);
    const { segments } = audio;

    return { audio: scopedAudio, segments };
  }

  return { audio: scopedAudio, segments: null };
}
