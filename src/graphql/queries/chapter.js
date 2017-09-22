import { gql } from 'react-apollo';

import chapterFragment from '../fragments/chapter';

export default gql`
  query Chapter($chapterId: ID!) {
    chapter(id: $chapterId) {
      ...chapterFragment
    }
  }

  ${chapterFragment}
`;
