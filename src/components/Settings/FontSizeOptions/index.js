import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as customPropTypes from 'customPropTypes';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import Icon from 'quran-components/lib/Icon';

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

  resetFontSize = () => {
    const { onOptionChange } = this.props;

    return onOptionChange({
      fontSize: {
        arabic: 3.5,
        translation: 2
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

  renderTitle() {
    return (
      <div className={styles.title}>
        <LocaleFormattedMessage
          id="setting.fontSize"
          defaultMessage="Font Size"
        />
        <Icon
          type="refresh"
          className={`text-right ${styles.reset}`}
          onClick={this.resetFontSize}
        />
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.renderTitle()}
        <li className={styles.link}>
          {this.renderOptions()}
        </li>
      </div>
    );
  }
}

FontSizeOptions.propTypes = {
  onOptionChange: PropTypes.func,
  fontSize: customPropTypes.fontSize.isRequired
};

export default FontSizeOptions;
