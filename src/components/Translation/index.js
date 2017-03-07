/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';

import { translationType } from 'types';

const styles = require('./style.scss');

export default class Translation extends Component {
  static propTypes = {
    translation: translationType.isRequired,
    index: PropTypes.number
  };

  render() {
    const { translation, index } = this.props;
    const lang = translation.languageName;
    const isArabic = lang === 'arabic';

    return (
      <div id={index} className={`${styles.translation} ${isArabic && 'arabic'} translation`}>
        <h4 className="montserrat">{translation.resourceName}</h4>
        <h2 className={`${isArabic ? 'text-right' : 'text-left'} text-translation times-new`}>
          <small
            dangerouslySetInnerHTML={{ __html: translation.text }}
            className={`${lang || 'times-new'}`}
          />
        </h2>
      </div>
    );
  }
}
