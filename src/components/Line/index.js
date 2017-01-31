import React, { PropTypes } from 'react';
import debug from 'helpers/debug';

import { wordType } from 'types';
import Word from 'components/Word';

const styles = require('../Ayah/style.scss');

export default class Line extends React.Component {
  static propTypes = {
    line: PropTypes.arrayOf(wordType).isRequired,
    tooltip: PropTypes.string,
    currentAyah: PropTypes.string.isRequired,
    audioActions: PropTypes.shape({
      pause: PropTypes.func.isRequired,
      setAyah: PropTypes.func.isRequired,
      play: PropTypes.func.isRequired,
      setCurrentWord: PropTypes.func.isRequired,
    }),
    isPlaying: PropTypes.bool
  };

  // NOTE: this is commented out as it caused problems with 55:31 with missing text.
  // shouldComponentUpdate(nextProps) {
  //   const conditions = [
  //     this.props.currentAyah !== nextProps.currentAyah,
  //     this.props.line !== nextProps.line,
  //     this.props.isPlaying !== nextProps.isPlaying
  //   ];
  //
  //   console.log(conditions, conditions.some(condition => condition));
  //
  //   return conditions.some(condition => condition);
  // }

  renderText() {
    const { tooltip, currentAyah, audioActions, isPlaying, line } = this.props;

    const text = line.map(word => (
      <Word
        word={word}
        key={`${word.position}-${word.code}-${word.lineNum}`}
        currentAyah={currentAyah}
        tooltip={tooltip}
        isPlaying={isPlaying}
        audioActions={audioActions}
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
      `Page: ${line[0].pageNum} - Line: ${line[0].lineNum} - Ayah: ${line[0].ayahKey}`
    );

    return (
      <div className={`row ${styles.font} text-justify text-arabic`}>
        <div className="col-md-12 line-container" name={`ayah:${line[0].ayahKey}`}>
          {this.renderText()}
        </div>
      </div>
    );
  }
}
