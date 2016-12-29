import React, { Component, PropTypes } from 'react';

import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import { optionsType } from 'types';

const style = require('./style.scss');

export default class FontSizeDropdown extends Component {
  static propTypes = {
    onOptionChange: PropTypes.func,
    options: optionsType
  }

  handleOptionSelected = (type, direction) => {
    const { onOptionChange, options: { fontSize } } = this.props;
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
    const title = (
      <LocaleFormattedMessage
        id="setting.fontSize"
        defaultMessage="Font size"
      />
    );

    return (
      <Popover id="FontSizeDropdown" title={title} className={style.popover}>
        <Row>
          <Col xs={3}>
            <a
              tabIndex="-1"
              onClick={() => this.handleOptionSelected('arabic', -1)}
              className="pointer"
            >
              <i className="ss-icon ss-hyphen" />
            </a>
          </Col>
          <Col xs={6} className="text-center">
            <LocaleFormattedMessage id="setting.fontSize.arabic" defaultMessage="Arabic" />
          </Col>
          <Col xs={3} className="text-right">
            <a
              tabIndex="-1"
              onClick={() => this.handleOptionSelected('arabic', 1)}
              className="pointer"
            >
              <i className="ss-icon ss-plus" />
            </a>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={3}>
            <a
              tabIndex="-1"
              onClick={() => this.handleOptionSelected('translation', -1)}
              className="pointer"
            >
              <i className="ss-icon ss-hyphen" />
            </a>
          </Col>
          <Col xs={6} className="text-center">
            <LocaleFormattedMessage id="setting.translations.title" defaultMessage="Translations" />
          </Col>
          <Col xs={3} className="text-right">
            <a
              tabIndex="-1"
              onClick={() => this.handleOptionSelected('translation', 1)}
              className="pointer"
            >
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
          tabIndex="-1"
          className="text-color"
          data-metrics-event-name="FontSizeDropdown"
        >
          <LocaleFormattedMessage id="setting.fontSize" defaultMessage="Font size" />
        </a>
      </OverlayTrigger>
    );
  }
}
