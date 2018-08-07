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
  values?: { [key: string]: string };
};

const T: React.SFC<Props> = ({ id, values }: Props & InjectedIntlProps) => (
  <FormattedMessage id={id} defaultMessage={en.messages[id]} values={values} />
);

T.propTypes = {
  id: PropTypes.string.isRequired,
  values: PropTypes.object, // eslint-disable-line
};

export const KEYS = LOCALE_KEYS;

export default injectIntl(T);
