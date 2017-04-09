import React, { Component, PropTypes } from 'react';
import * as customPropTypes from 'customPropTypes';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const style = require('./style.scss');

class FontSizeDropdown extends Component {

  handleOptionSelected = (type, direction) => {
    const { onOptionChange, fontSize } = this.props;
    const changeFactor = {
      translation: 0.5,
      arabic: 0.5
    };

    return onOptionChange({
      fontSize: {
        ...fontSize,
        [type]: fontSize[type] + (changeFactor[type] * direction)
      }
    });
  }

  renderPopup() {
    return (
      <div>
        <ul className={style.list}>
          <li className={`text-center ${style.item}`}>
            <a
              tabIndex="-1"
              onClick={() => this.handleOptionSelected('arabic', -1)}
              className="pointer"
            >
              <i className="ss-icon ss-hyphen" />
            </a>
          </li>
          <li className={`text-center ${style.item}`}>
            <LocaleFormattedMessage id="setting.fontSize.arabic" defaultMessage="Arabic" />
          </li>
          <li className={`text-center ${style.item}`}>
            <a
              tabIndex="-1"
              onClick={() => this.handleOptionSelected('arabic', 1)}
              className="pointer"
            >
              <i className="ss-icon ss-plus" />
            </a>
          </li>
        </ul>
        <br />
        <ul className={style.list}>
          <li className={`text-center ${style.item}`}>
            <a
              tabIndex="-1"
              onClick={() => this.handleOptionSelected('translation', -1)}
              className="pointer"
            >
              <i className="ss-icon ss-hyphen" />
            </a>
          </li>
          <li className={`text-center ${style.item}`}>
            <LocaleFormattedMessage id="setting.translations.title" defaultMessage="Translations" />
          </li>
          <li className={`text-center ${style.item}`}>
            <a
              tabIndex="-1"
              onClick={() => this.handleOptionSelected('translation', 1)}
              className="pointer"
            >
              <i className="ss-icon ss-plus" />
            </a>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <li className={style.link}>
        {this.renderPopup()}
      </li>
    );
  }
}

FontSizeDropdown.propTypes = {
    onOptionChange: PropTypes.func,
    fontSize: customPropTypes.fontSize.isRequired
};

export default FontSizeDropdown;
