import { gql } from 'react-apollo';

import verseFragment from '../fragments/verse';

export default gql`
  query Verses($chapterId: ID!, $offset: Int, $limit: Int, $resource_content_id: [ID]!) {
    verses(chapterId: $chapterId, offset: $offset, limit: $limit) {
      ...verseFragment
    }
  }

  ${verseFragment}
`;
