import React, { PropTypes } from 'react';
import debug from 'helpers/debug';

import { wordType } from 'types';
import Word from 'components/Word';

const styles = require('../Ayah/style.scss');
const CHAR_TYPE_WORD = 1;

export default class Line extends React.Component {
  static propTypes = {
    line: PropTypes.arrayOf(wordType).isRequired,
    tooltip: PropTypes.string,
    currentAyah: PropTypes.string.isRequired,
    audioActions: PropTypes.object.isRequired,
    currentWord: PropTypes.any,
    isPlaying: PropTypes.bool
  };

  shouldComponentUpdate(nextProps) {
    const conditions = [
      this.props.currentAyah !== nextProps.currentAyah,
      this.props.line !== nextProps.line,
      this.props.isPlaying !== nextProps.isPlaying
    ];

    return conditions.some(condition => condition);
  }

  renderText() {
    const { tooltip, currentAyah, audioActions, isPlaying, line } = this.props;

    const text = line.map(word => {
      return (
        <Word word={word} currentAyah={currentAyah} tooltip={tooltip} isPlaying={isPlaying} audioActions={audioActions}/>
      )
    });

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
        <div className="col-md-12 line-container">
          {this.renderText()}
        </div>
      </div>
    );
  }
}
