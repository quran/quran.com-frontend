import { gql } from 'react-apollo';
import wordFragment from './word';
import translationFragment from './translation';

export default gql`
  fragment verseFragment on Verse {
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

    translations(resource_content_id: $resource_content_id) {
      ...translationFragment
    }

    words{
      ...wordFragment
    }
  }

  ${wordFragment}
  ${translationFragment}
`;
