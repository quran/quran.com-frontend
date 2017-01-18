import React, { Component, PropTypes } from 'react';

import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Col from 'react-bootstrap/lib/Col';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const style = require('./style.scss');

export default class FontSizeDropdown extends Component {
  static propTypes = {
    onOptionChange: PropTypes.func,
    fontSize: PropTypes.shape({
      arabic: PropTypes.number,
      translation: PropTypes.number
    }).isRequired
  }

  handleOptionSelected = (type, direction) => {
    const { onOptionChange, fontSize } = this.props;
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
        <div className="row">
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
        </div>
        <br />
        <div className="row">
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
        </div>
      </Popover>
    );
  }

  render() {
    return (
      <li className={style.link}>
        <OverlayTrigger trigger="click" placement="bottom" overlay={this.renderPopup()} rootClose>
          <a
            tabIndex="-1"
            data-metrics-event-name="FontSizeDropdown"
          >
            <i className="ss-icon ss-font vertical-align-middle" />
            {' '}<LocaleFormattedMessage id="setting.fontSize" defaultMessage="Font Size" className="visible-xs-inline-block" />
          </a>
        </OverlayTrigger>
      </li>
    );
  }
}
