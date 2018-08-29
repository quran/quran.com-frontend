import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import SegmentShape from '../../shapes/SegmentShape';

const propTypes = {
  segments: SegmentShape.isRequired,
  currentVerseKey: PropTypes.string,
  currentTime: PropTypes.number,
};

const defaultProps: { currentVerseKey: undefined; currentTime: undefined } = {
  currentVerseKey: undefined,
  currentTime: undefined,
};

type Props = {
  segments: SegmentShape;
  currentVerseKey?: string;
  currentTime?: number;
};

const Segments: React.SFC<Props> = ({
  segments,
  currentVerseKey,
  currentTime,
}: Props) => {
  if (!Object.keys(segments).length || !currentTime) return null;

  const style = [];
  let currentWord: string | null = null;

  Object.keys(segments.words).forEach(wordIndex => {
    const word = segments.words[wordIndex];

    if (currentTime >= word.startTime && currentTime < word.endTime) {
      currentWord = `${currentVerseKey}:${wordIndex}`;
    }
  });

  if (currentWord) {
    style.push({
      cssText: `#word-${(currentWord as string).replace(/:/g, '-')}{
          color: #279197;
          border-color: #279197;
        }`,
    });
  } else {
    console.log('component:Segments', 'render without currentWord');
  }

  return <Helmet style={style} />;
};

Segments.propTypes = propTypes;
Segments.defaultProps = defaultProps;

export default Segments;
