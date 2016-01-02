import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Col } from 'react-bootstrap';

import debug from 'helpers/debug';
import flowType from 'helpers/flowType';

const style = require('../Ayah/style.scss');

export default class Line extends Component {
  static propTypes = {
    line: PropTypes.array.isRequired,
  }

  componentDidMount() {
    flowType(ReactDOM.findDOMNode(this));
  }

  text() {
    const { line } = this.props;

    if (!line[0].char) { // TODO shouldn't be possible, remove this clause
      return false;
    }

    const lineText = line.map(word => {
      if (word.word.translation) {
        return (
          <b key={word.char.code}
            className={word.char.font}
            data-toggle="tooltip"
            data-placement="top" title={word.word.translation}
            dangerouslySetInnerHTML={{__html: word.char.code}} />
        );
      }

      return (
        <b key={word.char.code}
          className={word.char.font}
          dangerouslySetInnerHTML={{__html: word.char.code}} />
      );
    });

    return (
      <span className={`${style.font} line`}>
        {lineText}
      </span>
    );
  }

  render() {
    debug(`Component:Line`);

    return (
      <div className={`row ${style.line} text-center`}>
        <Col md={12}>
          {this.text()}
        </Col>
      </div>
    );
  }
}
