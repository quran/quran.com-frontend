import React from 'react';
import PropTypes from 'prop-types';
import WordContainer from '../../containers/WordContainer';
import FontText from '../FontText';
import JuzMarker from '../JuzMarker';
import { VerseShape } from '../../shapes';

const propTypes = {
  verse: VerseShape.isRequired,
  isSearched: PropTypes.bool,
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
      word.charType === 'word' ? (wordAudioPosition += 1) : null;

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

export default Text;
