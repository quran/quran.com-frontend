import React, { PropTypes } from 'react';
import { intlShape, injectIntl } from 'react-intl';

class LocaleFormattedMessage extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string,
    intl: intlShape.isRequired,
    values: PropTypes.any
  };

  render() {
    const {id, defaultMessage, intl, values } = this.props;
    const params = {id: id, defaultMessage: defaultMessage, values: {values}}
    const formattedMessage = intl.formatMessage(params);

    return (
      <span className={intl.messages.local}>
        {formattedMessage}
      </span>
    );
  }
};

export default injectIntl(LocaleFormattedMessage);
