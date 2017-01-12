import React, { Component, PropTypes } from 'react';

import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

export default class TooltipDropdown extends Component {
  static propTypes = {
    onOptionChange: PropTypes.func,
    tooltip: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
  }

  handleOptionSelected = (type) => {
    const { onOptionChange } = this.props;

    return onOptionChange({
      tooltip: type
    });
  }

  renderList() {
    const { tooltip } = this.props;

    return ['translation', 'transliteration'].map(type => (
      <MenuItem
        onClick={() => this.handleOptionSelected(type)}
        active={tooltip === type}
        key={type}
      >
        <i className={`fa fa-check ${tooltip !== type && 'invisible'}`} />{' '}
        <LocaleFormattedMessage id={`setting.tooltip.${type}`} defaultMessage={type.toUpperCase()} />
      </MenuItem>
    ));
  }

  render() {
    const { className } = this.props;

    return (
      <DropdownButton
        link
        className={className}
        id="tooltip-dropdown"
        title={<LocaleFormattedMessage id="setting.tooltip" defaultMessage="Tooltip content" />}
      >
        {this.renderList()}
      </DropdownButton>
    );
  }
}
