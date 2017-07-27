import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';

const LocaleFormattedMessage = ({
  id,
  defaultMessage,
  intl,
  values,
  className
}) => (
  <span className={`${intl.messages.local} ${className}`}>
    <FormattedMessage id={id} defaultMessage={defaultMessage} values={values} />
  </span>
);

LocaleFormattedMessage.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  defaultMessage: PropTypes.string,
  intl: intlShape.isRequired,
  values: PropTypes.object // eslint-disable-line
};

LocaleFormattedMessage.defaultPropTypes = {
  className: ''
};

export default injectIntl(LocaleFormattedMessage);
