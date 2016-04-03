/* eslint-disable consistent-return */

import React from 'react';
import debug from 'utils/Debug';

class Line extends React.Component {
  static propTypes = {
    line: React.PropTypes.array.isRequired
  };

  // shouldComponentUpdate(nextProps) {
  //   return this.props.line.length !== nextProps.line.length;
  // }

  renderText() {
    const { line } = this.props;

    if (!line[0].char) { // TODO shouldn't be possible, remove this clause
      return;
    }

    let text = line.map((data, index) => {
      if (data.word.translation) {
        let tooltip = data.word.translation;

        return (
          <b
            key={`${index}`}
            className={`${data.char.font} pointer`}
            data-toggle="tooltip"
            data-ayah={data.ayahKey}
            data-line={data.char.line}
            data-page={data.char.page}
            data-position={data.word.position}
            data-placement="top" title={tooltip}
            dangerouslySetInnerHTML={{__html: data.char.code}}>
          </b>
        );
      }

      return (
        <b
          className={`${data.char.font} pointer`}
          key={`${data.char.page}${data.char.line}${data.word.position}`}
          data-line={data.char.line}
          data-page={data.char.page}
          dangerouslySetInnerHTML={{__html: data.char.code}}>
        </b>
      );
    });

    return (
      <span className="line text-center">
        {text}
      </span>
    );
  }

  render() {
    const { line } = this.props;

    debug('component:Line', `Page: ${line[0].char.page} - Line: ${line[0].char.line} - Ayah: ${line[0].ayahKey}`);

    return (
      <div className="row word-font text-justify text-arabic">
        <div className="col-md-12 line-container">
          {this.renderText()}
        </div>
      </div>
    );
  }
}

export default Line;
