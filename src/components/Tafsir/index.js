/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import * as customPropTypes from 'customPropTypes';

export default class Tafsir extends Component {
  render() {
    const { tafsir, verse } = this.props;

    return (
      <div className="col-md-10 col-md-offset-1">
        <h4 className="montserrat">{tafsir.resourceName}</h4>
        <h2>{verse.textMadani}</h2>
        <p
          className={`${tafsir.languageName} text-right`}
          dangerouslySetInnerHTML={{ __html: tafsir.text }}
        />
      </div>
    );
  }
}

Tafsir.propTypes = {
  tafsir: customPropTypes.tafsirType.isRequired,
  verse: customPropTypes.verseType
};
