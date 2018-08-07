import React from 'react';
import PropTypes from 'prop-types';
import WordContainer from '../../containers/WordContainer';
import FontText from '../FontText';
import JuzMarker from '../JuzMarker';
import { VerseShape } from '../../shapes';
import { WORD_TYPES } from '../../constants';

const propTypes = {
  verse: VerseShape.isRequired,
  isSearched: PropTypes.bool,
};

const defaultProps = {
  isSearched: false,
};

type Props = {
  verse: VerseShape;
  isSearched?: boolean;
};

const Text: React.SFC<Props> = ({ verse, isSearched }: Props) => {
  // NOTE: Some 'word's are glyphs (jeem). Not words and should not be clicked for audio
  let wordAudioPosition = -1;
  const renderText = false; // userAgent.isBot;

  const text = verse.words.map(word => {
    const audioPosition =
      word.charType === WORD_TYPES.CHAR_TYPE_WORD
        ? (wordAudioPosition += 1)
        : null;

    return (
      <WordContainer
        word={word}
        key={`${word.position}-${word.code}-${word.lineNum}`}
        audioPosition={audioPosition}
        isSearched={isSearched}
        useTextFont={renderText}
      />
    );
  });

  return (
    <FontText className="row text-right text-arabic">
      <JuzMarker verse={verse} text={text} />
    </FontText>
  );
};

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
