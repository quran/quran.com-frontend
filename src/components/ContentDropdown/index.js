import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import { loadTranslations } from 'redux/actions/options';
import { contentType } from 'types';

const style = require('./style.scss');

const compareAlphabetically = property =>
  (previous, next) => {
    const previousText = previous[property].toUpperCase();
    const nextText = next[property].toUpperCase();

    if (previousText < nextText) {
      return -1;
    }

    if (previousText > nextText) {
      return 1;
    }

    return 0;
  };


class ContentDropdown extends Component {
  static propTypes = {
    onOptionChange: PropTypes.func.isRequired,
    translations: PropTypes.arrayOf(PropTypes.number).isRequired,
    translationOptions: PropTypes.arrayOf(contentType),
    loadTranslations: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  componentDidMount() {
    if (!this.props.translationOptions.length) {
      return this.props.loadTranslations();
    }

    return false;
  }

  getTitle() {
    const { translationOptions, translations } = this.props;

    return translationOptions.filter(slug => translations.includes(slug.id)).map((slug) => {
      if (slug.languageName === 'English') return slug.authorName;

      return slug.languageName;
    }).join(', ');
  }

  handleRemoveContent = () => {
    const { onOptionChange } = this.props;

    onOptionChange({ translations: [] });
  }

  handleOptionSelected(id) {
    const { onOptionChange, translations } = this.props;

    if (translations.find(option => option === id)) {
      onOptionChange({ translations: translations.filter(option => option !== id) });
    } else {
      onOptionChange({ translations: [...translations, id] });
    }
  }

  renderItems(items, render) {
    const { translations } = this.props;

    return items.map((translation) => {
      const checked = translations.find(option => option === translation.id);

      return (
        <li key={translation.id} className={style.item}>
          <input
            type="checkbox"
            className={style.checkbox}
            id={translation.id + translation.languageName}
            onChange={() => this.handleOptionSelected(translation.id)}
            checked={checked}
          />

          <label htmlFor={translation.id + translation.languageName} className={style.label}>
            {render(translation)}
          </label>
        </li>
      );
    });
  }

  renderEnglishList() {
    const list = this.props.translationOptions
    .filter(translation => translation.languageName === 'English')
    .sort(compareAlphabetically('authorName'));

    return this.renderItems(list, translation => translation.authorName);
  }

  renderLanguagesList() {
    const list = this.props.translationOptions
    .filter(translation => translation.languageName !== 'English')
    .sort(compareAlphabetically('languageName'));

    return this.renderItems(list, translation => `${translation.languageName} - ${translation.authorName}`);
  }

  render() {
    const { className, translations } = this.props;

    return (
      <ButtonToolbar>
        <DropdownButton
          block
          id="content-dropdown"
          className={`dropdown ${className} ${style.dropdown}`}
          title={this.getTitle()}
        >
          {
            translations && translations.length &&
              <MenuItem onClick={this.handleRemoveContent}>
                <LocaleFormattedMessage id="setting.translations.removeAll" defaultMessage="Remove all" />
              </MenuItem>
          }
          <MenuItem header>
            <LocaleFormattedMessage id="setting.translations.english" defaultMessage="English" />
          </MenuItem>
          {this.renderEnglishList()}
          <MenuItem divider />
          <MenuItem header>
            <LocaleFormattedMessage id="setting.translations.other" defaultMessage="Other Languages" />
          </MenuItem>
          {this.renderLanguagesList()}
        </DropdownButton>
      </ButtonToolbar>
    );
  }
}

export default connect(state => ({
  translationOptions: state.options.options.translations,
  loadingTranslations: state.options.loadingTranslations,
  translations: state.options.translations
}), { loadTranslations })(ContentDropdown);
