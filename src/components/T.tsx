import React, { ReactNode } from 'react';
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
  children?: (...formattedMessage: Array<string | JSX.Element>) => ReactNode;
};

const T: React.SFC<Props> = ({
  id,
  values,
  children,
}: Props & InjectedIntlProps) => (
  <FormattedMessage id={id} defaultMessage={en.messages[id]} values={values}>
    {children}
  </FormattedMessage>
);

T.propTypes = {
  id: PropTypes.string.isRequired,
  values: PropTypes.object, // eslint-disable-line
  children: PropTypes.node, // eslint-disable-line
};

export const KEYS = LOCALE_KEYS;

export default injectIntl(T);
