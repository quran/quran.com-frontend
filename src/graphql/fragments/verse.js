import { gql } from 'react-apollo';
import wordFragment from './word';
import translationFragment from './translation';

export const baseVerseFragment = gql`
  fragment baseVerseFragment on Verse {
    chapterId
    hizbNumber
    id
    imageUrl
    imageWidth
    juzNumber
    pageNumber
    rubNumber
    sajdah
    sajdahNumber
    textIndopak
    textMadani
    textSimple
    verseIndex
    verseKey
    verseNumber
  }
`;
export const baseWithWordsVerseFragment = gql`
  fragment baseWithWordsVerseFragment on Verse {
    ...baseVerseFragment

    words{
      ...wordFragment
    }
  }

  ${baseVerseFragment}
  ${wordFragment}
`;

export default gql`
  fragment verseFragment on Verse {
    ...baseWithWordsVerseFragment
    
    translations(resource_content_id: $resource_content_id) {
      ...translationFragment
    }
  }

  ${translationFragment}
  ${baseWithWordsVerseFragment}
`;
