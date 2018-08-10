import { ChapterId, VerseId } from '../../types';
import {
  SET_CURRENT_FILE,
  SET_CURRENT_WORD,
  SET_CURRENT_VERSE_KEY,
  PLAY_CURRENT_WORD,
  PLAY,
  PAUSE,
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

export const setCurrentVerseKey = (verseKey: string, shouldPlay?: boolean) => ({
  type: SET_CURRENT_VERSE_KEY,
  payload: verseKey,
  meta: {
    shouldPlay,
  },
});

export const playCurrentWord = (payload: $TsFixMe) => ({
  type: PLAY_CURRENT_WORD,
  payload,
});

export const play = (verseKey?: string) => ({
  type: PLAY,
  payload: verseKey,
});

export const pause = () => ({
  type: PAUSE,
});

export const setRepeat = (repeat: {
  from?: number;
  to?: number;
  times?: number;
}) => ({
  type: SET_REPEAT,
  payload: repeat,
});

export const toggleScroll = () => ({
  type: TOGGLE_SCROLL,
});

export const buildOnClient = (chapterId: ChapterId) => ({
  type: BUILD_ON_CLIENT,
  chapterId,
});

type UpdatePayload = {
  duration?: number;
  currentTime?: number;
  isLoading?: boolean;
};

export const update = (payload: UpdatePayload) => ({
  type: UPDATE,
  payload,
});

export const fetchAudio = ({
  chapterId,
  verseId,
  verseKey,
  audio,
  isCurrentVerse,
}: {
  chapterId: ChapterId;
  verseId: VerseId;
  verseKey: string;
  audio: number;
  isCurrentVerse?: boolean;
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
  meta: {
    verseKey,
    chapterId,
    isCurrentVerse,
  },
});

export const isLoaded = (files: $TsFixMe, verse: VerseShape) =>
  files[verse.verseKey];

export type FetchAudio = typeof fetchAudio;
export type Play = typeof play;
export type Pause = typeof pause;
export type Update = typeof update;
export type ToggleScroll = typeof toggleScroll;
export type SetCurrentVerseKey = typeof setCurrentVerseKey;
export type SetRepeat = typeof setRepeat;
