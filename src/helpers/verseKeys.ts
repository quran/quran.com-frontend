import toNumber from 'lodash/toNumber';
import { CHAPTERS_TO_VERSES } from '../constants';

export const isValidVerseKey = (verseKey: string) => {
  const [chapterNumber, verseNumber] = verseKey.split(':').map(toNumber);

  return verseNumber > 0 && CHAPTERS_TO_VERSES[chapterNumber] >= verseNumber;
};

export const nextVerseKey = (verseKey: string) => {
  const [chapterNumber, verseNumber] = verseKey.split(':').map(toNumber);
  const nextVerseNumber = verseNumber + 1;

  const next = [chapterNumber, nextVerseNumber].join(':');

  return isValidVerseKey(next) ? next : null;
};

export const previousVerseKey = (verseKey: string) => {
  const [chapterNumber, verseNumber] = verseKey.split(':').map(toNumber);
  const previousVerseNumber = verseNumber - 1;

  const previous = [chapterNumber, previousVerseNumber].join(':');

  return isValidVerseKey(previous) ? previous : null;
};
