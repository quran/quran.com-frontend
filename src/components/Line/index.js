import React, { PropTypes } from 'react';
import debug from 'helpers/debug';

const styles = require('../Ayah/style.scss');
const CHAR_TYPE_WORD = 1;

export default class Line extends React.Component {
  static propTypes = {
    line: PropTypes.array.isRequired,
    tooltip: PropTypes.string,
    currentAyah: PropTypes.string.isRequired,
    audioActions: PropTypes.object.isRequired,
    currentWord: PropTypes.any,
    isPlaying: PropTypes.bool
  };

  shouldComponentUpdate(nextProps, nextState) {
    const conditions = [
      this.props.currentAyah !== nextProps.currentAyah,
      this.props.line !== nextProps.line
    ];

    return conditions.some(condition => condition);
  }

  handleWordClick(word){
    const { currentAyah, audioActions, isPlaying } = this.props;

    if(!audioActions.setCurrentWord)
      return;

    if(currentAyah && isPlaying) {
      audioActions.setCurrentWord(word.dataset.key) ;
    } else {
      audioActions.setAyah(word.dataset.ayah);
      audioActions.playCurrentWord(word.dataset.key);
    }
  }

  buildTooltip(word, tooltip){
    let title;
    if (!word.wordId) {
      title = `Verse ${word.ayahKey.split(':')[1]}`;
    } else {
      title = word[tooltip];
    }
    return title;
  }

  renderText() {
    const { line, tooltip, currentAyah } = this.props;

    if (!line[0].code) { // TODO shouldn't be possible, remove this clause
      return false;
    }
    let position;

    let text = line.map((word, index) => {
      const highlight = currentAyah == word.ayahKey ? 'highlight' : '';
      const className = `${word.className} ${highlight} ${word.highlight ? word.highlight : ''}`;
      let id = null;

      if (word.charTypeId === CHAR_TYPE_WORD) {
        position = word.position - 1;
        id = `word-${word.ayahKey.replace(/:/, '-')}-${position}`;
      }

      return (
          <b
            id={id}
            rel="tooltip"
            data-key={`${word.ayahKey}:${position}`}
            key={`${word.pageNum}${word.lineNum}${word.position}${word.code}`}
            className={`${className} pointer`}
            data-ayah={word.ayahKey}
            data-line={word.lineNun}
            data-page={word.pageNum}
            data-position={word.position}
            onClick={(event) => this.handleWordClick(event.target)}
            title={this.buildTooltip(word, tooltip)}
            dangerouslySetInnerHTML={{__html: word.code}}
          />
      );
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
