import { gql } from 'react-apollo';

export default gql`
  fragment juzFragment on Juz {
    juzNumber
    nameSimple
    nameArabic
    verseMapping
  }
`;
