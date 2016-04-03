import React, { Component, PropTypes } from 'react';
import { NavItem, OverlayTrigger, Popover, Tooltip, Row, Col } from 'react-bootstrap';

import { getFontSize } from '../../helpers/flowType';

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
    const incrementValueArabic = 5;
    const incrementValueTranslation = 2;

    return (
      <Popover id="FontSizeDropdown" title="Font Size" className={style.popover}>
        <Row>
          <Col xs={3}>
            <a onClick={this.handleOptionSelected.bind(this, 'arabic', -1)} className="pointer">
              <i className="ss-icon ss-hyphen" />
            </a>
          </Col>
          <Col xs={6} className="text-center">
            Arabic
          </Col>
          <Col xs={3} className="text-right">
            <a onClick={this.handleOptionSelected.bind(this, 'arabic', 1)} className="pointer">
              <i className="ss-icon ss-plus"/>
            </a>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col xs={3}>
            <a onClick={this.handleOptionSelected.bind(this, 'translation', -1)} className="pointer">
              <i className="ss-icon ss-hyphen" />
            </a>
          </Col>
          <Col xs={6} className="text-center">
            Translations
          </Col>
          <Col xs={3} className="text-right">
            <a onClick={this.handleOptionSelected.bind(this, 'translation', 1)} className="pointer">
              <i className="ss-icon ss-plus"/>
            </a>
          </Col>
        </Row>
      </Popover>
    );
  }

  render() {
    const helperText = 'Font size';

    return (
      <OverlayTrigger trigger="click" placement="bottom" overlay={this.renderPopup()} rootClose>
        <a
          href="#"
          className="text-color"
          data-metrics-event-name="FontSizeDropdown">
          Font size
        </a>
      </OverlayTrigger>
    );
  }
}
