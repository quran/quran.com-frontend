import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import * as customPropTypes from 'customPropTypes';
import debug from 'helpers/debug';
import Word from 'components/Word';
import FontText from 'components/FontText';

const StyledLine = styled.span`
  line-height: 150%;
  display: block;
  width: 100%;
  margin: 0 auto;
`;

class Line extends Component {
  // NOTE: this is commented out as it caused problems with 55:31 with missing text.
  // shouldComponentUpdate(nextProps) {
  //   const conditions = [
  //     this.props.currentVerse !== nextProps.currentVerse,
  //     this.props.line !== nextProps.line,
  //     this.props.isPlaying !== nextProps.isPlaying
  //   ];
  //
  //   console.log(conditions, conditions.some(condition => condition));
  //
  //   return conditions.some(condition => condition);
  // }

  renderText() {
    const {
      tooltip,
      currentVerse,
      audioActions,
      isPlaying,
      line,
      useTextFont
    } = this.props;

    // NOTE: Some 'word's are glyphs (jeem). Not words and should not be clicked for audio
    let wordAudioPosition = -1;

    const text = line.map(word =>
      <Word
        word={word}
        key={`${word.position}-${word.code}-${word.lineNum}`}
        currentVerse={currentVerse}
        tooltip={tooltip}
        isPlaying={isPlaying}
        audioActions={audioActions}
        audioPosition={
          word.charType === 'word' ? (wordAudioPosition += 1) : null
        }
        useTextFont={useTextFont}
      />
    );

    return (
      <StyledLine className="text-center">
        {text}
      </StyledLine>
    );
  }

  render() {
    const { line } = this.props;

    debug(
      'component:Line',
      `Page: ${line[0].pageNum} - Line: ${line[0].lineNum} - Ayah: ${line[0]
        .verseKey}`
    );

    return (
      <FontText className="row text-justify text-arabic">
        <div
          className="col-md-12 line-container"
          name={`verse:${line[0].verseKey}`}
        >
          {this.renderText()}
        </div>
      </FontText>
    );
  }
}

Line.propTypes = {
  line: customPropTypes.line.isRequired,
  tooltip: PropTypes.string,
  currentVerse: PropTypes.string.isRequired,
  audioActions: customPropTypes.audioActions,
  isPlaying: PropTypes.bool,
  useTextFont: PropTypes.bool
};

export default Line;
