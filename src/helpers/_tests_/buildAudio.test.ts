import { buildAudioURL, buildAudioForVerse } from '../buildAudio';

const audio = {
  url: '//quran.com/1.mp3',
  segments: [],
};

describe('buildAudio helpers', () => {
  describe('buildAudioUrl', () => {
    it('returns the correct audio url', () => {
      expect(buildAudioURL(audio)).toEqual('//quran.com/1.mp3');
    });
  });

  describe('buildAudioForVerse', () => {
    it('returns audio and segments', () => {
      const audioNode = new Audio();
      audioNode.src = audio.url;
      audioNode.preload = 'none';

      expect(buildAudioForVerse(audio)).toEqual({
        audio: audioNode,
        segments: audio.segments,
      });
    });

    it('returns audio without src and segments', () => {
      const audioNode = new Audio();
      audioNode.preload = 'none';

      expect(buildAudioForVerse({})).toEqual({
        audio: audioNode,
        segments: null,
      });
    });
  });
});
