import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
  InjectedIntlProps, // eslint-disable-line
} from 'react-intl';
import config from '../../config';
import LOCALE_KEYS from '../locale/keys';

type Props = {
  id: LOCALE_KEYS;
  values?: { [key: string]: string };
  intl?: $TsFixMe;
  children?: (...formattedMessage: Array<string | JSX.Element>) => ReactNode;
};

const { en } = config('localeMessages');

const T: React.SFC<Props> = ({
  id,
  values,
  children,
  intl,
}: Props & InjectedIntlProps) => (
  <span className={`${intl.messages.local}`}>
    <FormattedMessage id={id} defaultMessage={en.messages[id]} values={values}>
      {children}
    </FormattedMessage>
  </span>
);

T.propTypes = {
  id: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  values: PropTypes.object, // eslint-disable-line
  children: PropTypes.node, // eslint-disable-line
};

export const KEYS = LOCALE_KEYS;

export default injectIntl(T);
