import React, { Component, PropTypes } from 'react';

import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Col from 'react-bootstrap/lib/Col';

import SwitchToggle from 'components/SwitchToggle';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import { optionsType } from 'types';

const style = require('./style.scss');

export default class TooltipDropdown extends Component {
  static propTypes = {
    onOptionChange: PropTypes.func,
    options: optionsType
  }

  handleOptionSelected = ({ target: { checked } }) => {
    const { onOptionChange } = this.props;

    return onOptionChange({
      tooltip: checked ? 'transliteration' : 'translation'
    });
  }

  renderPopup() {
    const { options: { tooltip } } = this.props;
    const tooltipTitle = <LocaleFormattedMessage id="setting.tooltip.title" defaultMessage="DISPLAY TOOLTIP" />;

    return (
      <Popover id="TooltipDropdown" title={tooltipTitle} className={style.popover}>
        <div className="row">
          <Col xs={12}>
            <LocaleFormattedMessage id="setting.tooltip.translation" defaultMessage="Translation" />
            {' '}
            <SwitchToggle
              checked={tooltip === 'transliteration'}
              onToggle={this.handleOptionSelected}
              id="tooltip-toggle"
              flat
            />
            {' '}
            <LocaleFormattedMessage id="setting.tooltip.transliteration" defaultMessage="Transliteration" />
          </Col>
        </div>
      </Popover>
    );
  }

  render() {
    return (
      <OverlayTrigger trigger="click" placement="bottom" overlay={this.renderPopup()} rootClose>
        <a
          tabIndex="-1"
          className="text-color"
          data-metrics-event-name="TooltipDropdown"
        >
          <LocaleFormattedMessage id="setting.tooltip" defaultMessage="Tooltip" />
        </a>
      </OverlayTrigger>
    );
  }
}
