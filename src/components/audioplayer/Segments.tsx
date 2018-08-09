import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import SegmentShape from '../../shapes/SegmentShape';

const propTypes = {
  segments: SegmentShape.isRequired,
  currentVerseKey: PropTypes.string,
  currentTime: PropTypes.number,
};

const defaultProps: { currentVerseKey: null; currentTime: null } = {
  currentVerseKey: null,
  currentTime: null,
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
  const style = [];
  let currentWord: string | null = null;

  if (!Object.keys(segments).length) return <noscript />;

  Object.keys(segments.words).forEach(wordIndex => {
    const word = segments.words[wordIndex];

    if (currentTime >= word.startTime && currentTime < word.endTime) {
      currentWord = `${currentVerseKey}:${wordIndex}`;
    }
  });

  if (currentWord) {
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
