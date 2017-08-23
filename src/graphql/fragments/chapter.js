import { gql } from 'react-apollo';

export default gql`
  fragment chapterFragment on Chapter {
    bismillahPre
    chapterNumber
    id
    nameArabic
    nameComplex
    nameSimple
    pages
    revelationOrder
    revelationPlace
    versesCount

    translatedName {
      languageName
      name
    }
  }
`;
