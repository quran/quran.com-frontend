import { gql } from 'react-apollo';

export default gql`
  fragment translationFragment on Translation {
    languageId
    languageName
    resourceContentId
    resourceId
    resourceName
    resourceType
    text
  }
`;
