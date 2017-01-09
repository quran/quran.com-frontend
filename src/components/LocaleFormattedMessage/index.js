import React, { PropTypes } from 'react';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';

const LocaleFormattedMessage = ({ id, defaultMessage, intl, values }) => (
  <span className={intl.messages.local}>
    <FormattedMessage id={id} defaultMessage={defaultMessage} values={values} />
  </span>
);

LocaleFormattedMessage.propTypes = {
  id: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string,
  intl: intlShape.isRequired,
  values: PropTypes.object // eslint-disable-line
};

export default injectIntl(LocaleFormattedMessage);
