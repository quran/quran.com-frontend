import { gql } from 'react-apollo';

export default gql`
  fragment wordFragment on Word {
    audioUrl
    charTypeId
    charTypeName
    className
    code
    codeV3
    id
    imageBlob
    imageUrl
    lineNumber
    location
    pageNumber
    pauseName
    position
    textIndopak
    textMadani
    textSimple
    tokenId
    topicId
    verseId
    verseKey
    translation{
      text
    }
    transliteration{
      text
    }
  }
`;
