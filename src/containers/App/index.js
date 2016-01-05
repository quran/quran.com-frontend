import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import FontStyles from 'components/FontStyles';

import config from '../../config';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;
    const styles = require('./style.scss');

    return (
      <div className={styles.app}>
        <DocumentMeta {...config.app}/>
        <FontStyles />
        {children}
      </div>
    );
  }
}
