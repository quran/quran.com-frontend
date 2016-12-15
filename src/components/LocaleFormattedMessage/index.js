import React, { PropTypes, createElement } from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

class LocaleFormattedMessage extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string,
    intl: intlShape.isRequired
  };

  render() {
    const {id, defaultMessage, intl, tag } = this.props;
    const formattedMessage = intl.formatMessage({id: id, defaultMessage: defaultMessage});

    return (
      <span className={intl.messages.local}>
        {formattedMessage}
      </span>
    );
  }
};

export default injectIntl(LocaleFormattedMessage);
