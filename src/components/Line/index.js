import React, { PropTypes } from 'react';
import debug from 'helpers/debug';

const styles = require('../Ayah/style.scss');

export default class Line extends React.Component {
  static propTypes = {
    line: PropTypes.array.isRequired,
    tooltip: PropTypes.string,
    currentAyah: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    const conditions = [
      this.props.currentAyah !== nextProps.currentAyah,
      this.props.line !== nextProps.line
    ];

    return conditions.some(condition => condition);
  }

  renderText() {
    const { line, tooltip, currentAyah } = this.props;

    if (!line[0].code) { // TODO shouldn't be possible, remove this clause
      return false;
    }

    const text = line.map((word) => {
      const highlight = currentAyah === word.ayahKey ? 'highlight' : '';

      if (word.translation) {
        const tooltipContent = word[tooltip];

        return (
          <b
            key={`${word.pageNum}${word.lineNum}${word.position}${word.code}`}
            className={`${word.className} ${styles.Tooltip} ${highlight}`}
            data-ayah={word.ayahKey}
            data-line={word.lineNun}
            data-page={word.pageNum}
            data-position={word.position}
            aria-label={tooltipContent}
            dangerouslySetInnerHTML={{ __html: word.code }}
          />
        );
      }

      return (
        <b
          className={`${word.className} ${highlight} pointer`}
          key={`${word.pageNum}${word.lineNum}${word.position}${word.code}`}
          data-line={word.lineNum}
          data-page={word.pageNum}
          dangerouslySetInnerHTML={{ __html: word.code }}
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
