/* eslint-disable consistent-return */

import React from 'react';
import debug from 'utils/Debug';
import Flowtype from 'utils/Flowtype';

class Line extends React.Component {
  text() {
    const { line } = this.props;

    if (!line[0].char) { // TODO shouldn't be possible, remove this clause
      return;
    }

    let text = line.map(data => {
      if (data.word.translation) {
        let tooltip = data.word.translation;

        return (
          <b key={data.char.code}
            className={`${data.char.font} pointer`}
            data-toggle="tooltip"
            data-placement="top" title={tooltip}
            dangerouslySetInnerHTML={{__html: data.char.code}}>
          </b>
        );
      }
      else {
        return (
          <b
            className={`${data.char.font} pointer`}
            key={data.char.code}
            dangerouslySetInnerHTML={{__html: data.char.code}}>
          </b>
        );
      }
    });

    return (
      <span className="line text-center">
        {text}
      </span>
    );

    return (
      <h1 className="word-font text-right">
        {text}
      </h1>
    );
  }

  componentDidMount() {
    Flowtype(ReactDOM.findDOMNode(this));
  }

  render() {
    const { line } = this.props;

    debug(`COMPONENT-LINE RENDERED page ${line[0].char.page}, line ${line[0].char.line}, ayah ${line[0].ayah_key}`);

    return (
      <div className="row word-font text-right">
        <div className="col-md-12 line-container">
          {this.text()}
        </div>
      </div>
    );
  }
}

Line.propTypes = {
  line: React.PropTypes.array.isRequired
};

export default Line;
