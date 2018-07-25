import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';

interface Messages {
  local: string;
}

interface Intl {
  messages: Messages;
}

type Props = {
  id: string;
  defaultMessage: string;
  intl: Intl;
  values: $TsFixMe;
  className: string;
};

const T: React.SFC<Props> = ({
  id,
  defaultMessage,
  intl,
  values,
  className,
}: Props) => (
  <span className={`${intl.messages.local} ${className}`}>
    <FormattedMessage id={id} defaultMessage={defaultMessage} values={values} />
  </span>
);

T.propTypes = {
  id: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  className: PropTypes.string,
  intl: intlShape.isRequired,
  values: PropTypes.object, // eslint-disable-line
};

T.defaultProps = {
  className: '',
};

export default injectIntl(T);
