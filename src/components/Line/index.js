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
    currentWord: PropTypes.any
  };

  shouldComponentUpdate(nextProps, nextState) {
    const conditions = [
      this.props.currentAyah !== nextProps.currentAyah,
      this.props.line !== nextProps.line
    ];

    return conditions.some(condition => condition);
  }

  renderText() {
    const { line, tooltip, currentAyah, audioActions } = this.props;

    if (!line[0].code) { // TODO shouldn't be possible, remove this clause
      return false;
    }
    let position = -1;

    let text = line.map(word => {
      const highlight = currentAyah == word.ayahKey ? 'highlight' : '';
      const className = `${word.className} ${word.highlight ? word.highlight : ''}`;
      let id = null;

      if (word.charTypeId === CHAR_TYPE_WORD) {
        position = position + 1;
        id = `word-${word.ayahKey.replace(/:/, '-')}-${position}`;
      }


      if (word.translation) {
        let tooltipContent = word[tooltip];

        return (
          <b
            id={id}
            data-key={`${word.ayahKey}:${position}`}
            key={`${word.pageNum}${word.lineNum}${word.position}${word.code}`}
            className={`${word.className} ${styles.Tooltip} ${highlight} ${className}`}
            data-ayah={word.ayahKey}
            data-line={word.lineNun}
            data-page={word.pageNum}
            data-position={word.position}
            aria-label={tooltipContent}
            onClick={event =>
              audioActions.setCurrentWord && audioActions.setCurrentWord(event.target.dataset.key)
            }
            dangerouslySetInnerHTML={{__html: word.code}}
          />
        );
      }

      return (
        <b
          className={`${word.className} ${highlight} pointer ${className}`}
          key={`${word.pageNum}${word.lineNum}${word.position}${word.code}`}
          data-line={word.lineNum}
          data-page={word.pageNum}
          dangerouslySetInnerHTML={{__html: word.code}}
          onClick={event =>
            audioActions.setCurrentWord && audioActions.setCurrentWord(event.target.dataset.key)
          }
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
