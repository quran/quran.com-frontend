import { gql } from 'react-apollo';

import chapterFragment from '../fragments/chapter';

export default gql`
  query Chapters {
    chapters {
      ...chapterFragment
    }
  }

  ${chapterFragment}
`;
