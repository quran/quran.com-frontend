import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Word from '../Word';
import FontText from '../FontText';
import { LineShape } from '../../shapes';
import WordContainer from '../../containers/WordContainer';

const StyledLine = styled.span`
  line-height: 150%;
  display: block;
  width: 100%;
  margin: 0 auto;
`;

const propTypes = {
  line: LineShape.isRequired,
  useTextFont: PropTypes.bool,
};

type Props = {
  line: LineShape;
  useTextFont?: boolean;
};

const Line: React.SFC<Props> = ({ line, useTextFont }: Props) => {
  let wordAudioPosition = -1;

  const text = line.map(word => {
    const audioPosition =
      word.charType === 'word' ? (wordAudioPosition += 1) : null;

    return (
      <WordContainer
        word={word}
        key={`${word.position}-${word.code}-${word.lineNum}`}
        audioPosition={audioPosition}
        useTextFont={useTextFont}
      />
    );
  });

  return (
    <FontText className="row text-arabic">
      <div className="col-md-12">
        <StyledLine className="text-center">{text}</StyledLine>
      </div>
    </FontText>
  );
};

Line.propTypes = propTypes;

export default Line;
