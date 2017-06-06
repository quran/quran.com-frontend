import React, { Component, PropTypes } from 'react';
import * as customPropTypes from 'customPropTypes';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const styles = require('./styles.scss');

class FontSizeOptions extends Component {
  handleOptionSelected = (type, direction) => {
    const { onOptionChange, fontSize } = this.props;
    const changeFactor = {
      translation: 0.5,
      arabic: 0.5
    };

    return onOptionChange({
      fontSize: {
        ...fontSize,
        [type]: fontSize[type] + changeFactor[type] * direction
      }
    });
  };

  renderOptions() {
    return (
      <div>
        <ul className={styles.list}>
          <li className={`text-center ${styles.item}`}>
            <a
              tabIndex="-1"
              onClick={() => this.handleOptionSelected('arabic', -1)}
              className="pointer"
            >
              <i className="ss-icon ss-hyphen" />
            </a>
          </li>
          <li className={`text-center ${styles.item}`}>
            <LocaleFormattedMessage
              id="setting.fontSize.arabic"
              defaultMessage="Arabic"
            />
          </li>
          <li className={`text-center ${styles.item}`}>
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
        <ul className={styles.list}>
          <li className={`text-center ${styles.item}`}>
            <a
              tabIndex="-1"
              onClick={() => this.handleOptionSelected('translation', -1)}
              className="pointer"
            >
              <i className="ss-icon ss-hyphen" />
            </a>
          </li>
          <li className={`text-center ${styles.item}`}>
            <LocaleFormattedMessage
              id="setting.translations.title"
              defaultMessage="Translations"
            />
          </li>
          <li className={`text-center ${styles.item}`}>
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
      <li className={styles.link}>
        {this.renderOptions()}
      </li>
    );
  }
}

FontSizeOptions.propTypes = {
  onOptionChange: PropTypes.func,
  fontSize: customPropTypes.fontSize.isRequired
};

export default FontSizeOptions;
