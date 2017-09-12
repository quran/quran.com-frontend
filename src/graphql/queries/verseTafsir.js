import { gql } from 'react-apollo';

export default gql`
  query VerseTafsir($verseKey: String!, $tafsirId: ID!) {
    verseTafsir(verseKey: $verseKey, tafsirId: $tafsirId) {
      id
      resourceName
      text
      languageName
    }
  }
`;
