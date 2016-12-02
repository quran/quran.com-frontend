import React, { Component, PropTypes } from 'react';

import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import SwitchToggle from 'components/SwitchToggle';

const style = require('./style.scss');

export default class TooltipDropdown extends Component {
  static propTypes = {
    onOptionChange: PropTypes.func,
    options: PropTypes.object
  }

  handleOptionSelected = ({ target: { checked } }) => {
    const { onOptionChange } = this.props;

    return onOptionChange({
      tooltip: checked ? 'transliteration' : 'translation'
    });
  }

  renderPopup() {
    const { options: { tooltip }} = this.props;

    return (
      <Popover id="TooltipDropdown" title="Tooltip display" className={style.popover}>
        <Row>
          <Col xs={12}>
            Translation{' '}
            <SwitchToggle
              checked={tooltip === 'transliteration'}
              onToggle={this.handleOptionSelected}
              id="tooltip-toggle"
              flat
            />
            {' '}Transliteration
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
          data-metrics-event-name="TooltipDropdown"
        >
          Tooltip
        </a>
      </OverlayTrigger>
    );
  }
}
