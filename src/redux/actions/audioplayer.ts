import { ChapterId, VerseId } from '../../types';
import {
  SET_CURRENT_FILE,
  SET_CURRENT_WORD,
  PLAY_CURRENT_WORD,
  PLAY,
  PAUSE,
  NEXT,
  SET_AYAH,
  PREVIOUS,
  SET_REPEAT,
  TOGGLE_SCROLL,
  BUILD_ON_CLIENT,
  FETCH_AUDIOPLAYER,
  UPDATE,
} from '../constants/audioplayer';
import apiClient from '../../apiClient';
import { VerseShape } from '../../shapes';

export const setCurrentFile = (file: $TsFixMe) => ({
  type: SET_CURRENT_FILE,
  file,
});

export const setCurrentWord = (word: $TsFixMe) => ({
  type: SET_CURRENT_WORD,
  word,
});

export const playCurrentWord = (payload: $TsFixMe) => ({
  type: PLAY_CURRENT_WORD,
  payload,
});

export const play = () => ({
  type: PLAY,
});

export const pause = () => ({
  type: PAUSE,
});

export const next = (currentVerse: string) => ({
  type: NEXT,
  currentVerse,
});

export const setVerse = (currentVerse: string) => ({
  type: SET_AYAH,
  currentVerse,
});

export const previous = (currentVerse: string) => ({
  type: PREVIOUS,
  currentVerse,
});

export const setRepeat = (repeat: boolean) => ({
  type: SET_REPEAT,
  repeat,
});

export const toggleScroll = () => ({
  type: TOGGLE_SCROLL,
});

export const buildOnClient = (chapterId: ChapterId) => ({
  type: BUILD_ON_CLIENT,
  chapterId,
});

export const update = (payload: $TsFixMe) => ({
  type: UPDATE,
  payload,
});

export const fetchAudio = ({
  chapterId,
  verseId,
  verseKey,
  audio,
}: {
  chapterId: ChapterId;
  verseId: VerseId;
  verseKey: string;
  audio: number;
}) => ({
  type: FETCH_AUDIOPLAYER,
  promise: apiClient.get(
    `/api/v3/chapters/${chapterId}/verses/${verseId}/audio_files`,
    {
      params: {
        recitation: audio || 7, // NOTE: default, but should never be used
      },
    }
  ),
  verseKey,
  chapterId,
});

export const isLoaded = (files: $TsFixMe, verse: VerseShape) =>
  files[verse.verseKey];
