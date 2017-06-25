import React, { Component, PropTypes } from 'react';
import * as customPropTypes from 'customPropTypes';
import debug from 'helpers/debug';
import Word from 'components/Word';

const styles = require('../Verse/style.scss');

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

    const text = line.map((word) => ( // eslint-disable-line
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
    ));

    return (
      <span className={`${styles.line} text-center`}>
        {text}
      </span>
    );
  }

  render() {
    const { line } = this.props;

    debug(
      'component:Line',
      `Page: ${line[0].pageNum} - Line: ${line[0].lineNum} - Ayah: ${line[0].verseKey}`
    );

    return (
      <div className={`row ${styles.font} text-justify text-arabic`}>
        <div
          className="col-md-12 line-container"
          name={`ayah:${line[0].verseKey}`}
        >
          {this.renderText()}
        </div>
      </div>
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
