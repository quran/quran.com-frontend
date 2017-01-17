import React, { PropTypes } from 'react';

import Radio from 'components/Radio';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const TooltipDropdown = ({ tooltip, onOptionChange }) => {
  const handleOptionChange = type => onOptionChange({
    tooltip: type
  });

  const list = ['translation', 'transliteration'].map(type => (
    <Radio key={type} id={type} name="type" checked={type === tooltip} handleChange={() => handleOptionChange(type)}>
      <LocaleFormattedMessage id={`setting.tooltip.${type}`} defaultMessage={type.toUpperCase()} />
    </Radio>
  ));

  return (
    <div>
      {list}
    </div>
  );
};

TooltipDropdown.propTypes = {
  onOptionChange: PropTypes.func,
  tooltip: PropTypes.string.isRequired,
};

export default TooltipDropdown;
