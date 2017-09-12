import { gql } from 'react-apollo';

import { baseWithWordsVerseFragment } from '../fragments/verse';

export default gql`
  query Verse($verseKey: String!) {
    verse(verseKey: $verseKey) {
      ...baseWithWordsVerseFragment
    }
  }

  ${baseWithWordsVerseFragment}
`;
