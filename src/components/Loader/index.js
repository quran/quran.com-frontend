import React from 'react';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const styles = require('./style.scss');

const Loader = () => (
  <div className={styles.loader}>
    <LocaleFormattedMessage id={'app.loading'} defaultMessage={'Loading...'}/>
  </div>
);

export default Loader;
