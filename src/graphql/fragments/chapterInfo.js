import { gql } from 'react-apollo';

export default gql`
  fragment chapterInfoFragment on ChapterInfo {
    chapterId
    id
    languageId
    languageName
    resourceContentId
    shortText
    source
    text
  }
`;
