import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  FormattedMessage,
  InjectedIntlProps, // eslint-disable-line
} from 'react-intl';
import en from '../locale/en';
import LOCALE_KEYS from '../locale/keys';

type Props = {
  id: LOCALE_KEYS;
  values?: $TsFixMe;
  className?: string;
};

const T: React.SFC<Props> = ({
  id,
  values,
  className,
}: Props & InjectedIntlProps) => (
  <span className={`${className}`}>
    <FormattedMessage
      id={id}
      defaultMessage={en.messages[id]}
      values={values}
    />
  </span>
);

T.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  values: PropTypes.object, // eslint-disable-line
};

T.defaultProps = {
  className: '',
};

export const KEYS = LOCALE_KEYS;

export default injectIntl(T);
