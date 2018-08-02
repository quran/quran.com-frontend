import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import SegmentShape from '../../shapes/SegmentShape';

const propTypes = {
  segments: SegmentShape.isRequired,
  currentVerse: PropTypes.string,
  currentTime: PropTypes.number,
};

const defaultProps: { currentVerse: null; currentTime: null } = {
  currentVerse: null,
  currentTime: null,
};

type Props = {
  segments: SegmentShape;
  currentVerse?: string;
  currentTime?: number;
};

const Segments: React.SFC<Props> = ({
  segments,
  currentVerse,
  currentTime,
}: Props) => {
  const style = [];
  let currentWord: string | null = null;

  if (!Object.keys(segments).length) return <noscript />;

  Object.keys(segments.words).forEach(wordIndex => {
    const word = segments.words[wordIndex];

    if (currentTime >= word.startTime && currentTime < word.endTime) {
      currentWord = `${currentVerse}:${wordIndex}`;
    }
  });

  if (currentWord) {
    console.log('component:Segments', `render with currentWord ${currentWord}`);

    style.push({
      cssText: `#word-${currentWord.replace(/:/g, '-')}{
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
