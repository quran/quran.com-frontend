import React, { Component, PropTypes } from 'react';
import { NavItem, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

import { toggleReadingMode } from 'redux/modules/options';

@connect(state => ({isReadingMode: state.options.isReadingMode}), { toggleReadingMode })
export default class ReadingModeToggle extends Component {
  static propTypes = {
    isReadingMode: PropTypes.bool,
    toggleReadingMode: PropTypes.func
  }

  onSelect() {
    return this.props.toggleReadingMode();
  }

  render() {
    const { isReadingMode } = this.props;

    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={<Tooltip id="ReadingModeToggle">Toggle reading mode</Tooltip>}>
        <NavItem eventKey={1} onSelect={this.onSelect.bind(this)} active={isReadingMode}>
          <i className="ss-icon ss-openbook" />
        </NavItem>
      </OverlayTrigger>
    );
  }
}
