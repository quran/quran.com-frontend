import React, { Component, PropTypes } from 'react';

import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const style = require('./style.scss');

export default class FontSizeDropdown extends Component {
  static propTypes = {
    onOptionChange: PropTypes.func,
    options: PropTypes.object
  }

  handleOptionSelected = (type, direction) => {
    const { onOptionChange, options: { fontSize }} = this.props;
    const changeFactor = {
      translation: 0.5,
      arabic: 0.5
    };

    return onOptionChange({
      fontSize: {
        ...fontSize,
        [type]: fontSize[type] + (changeFactor[type] * direction)
      }
    });
  }

  renderPopup() {
    return (
      <Popover id="FontSizeDropdown" title="Font Size" className={style.popover}>
        <Row>
          <Col xs={3}>
            <a onClick={() => this.handleOptionSelected('arabic', -1)} className="pointer">
              <i className="ss-icon ss-hyphen" />
            </a>
          </Col>
          <Col xs={6} className="text-center">
            Arabic
          </Col>
          <Col xs={3} className="text-right">
            <a onClick={() => this.handleOptionSelected('arabic', 1)} className="pointer">
              <i className="ss-icon ss-plus" />
            </a>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={3}>
            <a onClick={() => this.handleOptionSelected('translation', -1)} className="pointer">
              <i className="ss-icon ss-hyphen" />
            </a>
          </Col>
          <Col xs={6} className="text-center">
            Translations
          </Col>
          <Col xs={3} className="text-right">
            <a onClick={() => this.handleOptionSelected('translation', 1)} className="pointer">
              <i className="ss-icon ss-plus" />
            </a>
          </Col>
        </Row>
      </Popover>
    );
  }

  render() {
    return (
      <OverlayTrigger trigger="click" placement="bottom" overlay={this.renderPopup()} rootClose>
        <a
          href="#"
          className="text-color"
          data-metrics-event-name="FontSizeDropdown"
        >
          Font size
        </a>
      </OverlayTrigger>
    );
  }
}
