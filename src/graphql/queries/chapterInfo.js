import { gql } from 'react-apollo';

import chapterInfoFragment from '../fragments/chapterInfo';

export default gql`
  query ChapterInfo($chapterId: ID!) {
    chapterInfo(chapterId: $chapterId) {
      ...chapterInfoFragment
    }
  }

  ${chapterInfoFragment}
`;
