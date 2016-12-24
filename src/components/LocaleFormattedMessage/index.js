import React, { PropTypes } from 'react';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';

class LocaleFormattedMessage extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string,
    intl: intlShape.isRequired,
    values: PropTypes.any
  };

  render() {
    const {id, defaultMessage, intl, values } = this.props;
   
    return (
      <span className={intl.messages.local}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} values={values}/>
      </span>
    );
  }
};

export default injectIntl(LocaleFormattedMessage);
