import React, { Component, PropTypes } from 'react';
import { NavItem, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

import { toggleReadingMode } from 'redux/modules/options';

@connect(state => ({isReadingMode: state.options.isReadingMode}), { toggleReadingMode })
export default class ReadingModeToggle extends Component {
  static propTypes = {
    isReadingMode: PropTypes.bool,
    toggleReadingMode: PropTypes.func
  };

  onSelect() {
    return this.props.toggleReadingMode();
  }

  render() {
    const { isReadingMode } = this.props;
    const helperText = 'Toggle reading mode';
    const popover = <Tooltip id="ReadingModeToggle" className="hidden-xs hidden-sm">{helperText}</Tooltip>;

    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popover}>
        <NavItem eventKey={1} onSelect={this.onSelect.bind(this)} active={isReadingMode}>
          <i className="ss-icon ss-openbook hidden-xs hidden-sm" />
          <span className="visible-sm visible-xs">
            <i className="ss-icon ss-openbook margin-md-right" />
            {helperText}
          </span>
        </NavItem>
      </OverlayTrigger>
    );
  }
}
