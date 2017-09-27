import React, { Component, PropTypes } from 'react';
import * as customPropTypes from 'customPropTypes';
import { connect } from 'react-redux';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import { loadTranslations } from 'redux/actions/options';
import Menu, { MenuItem } from 'quran-components/lib/Menu';
import Checkbox from 'quran-components/lib/Checkbox';
import Loader from 'quran-components/lib/Loader';
import Icon from 'quran-components/lib/Icon';

const style = require('./style.scss');

const compareAlphabetically = property => (previous, next) => {
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

const TRANSLATIONS_SELECTION_LIMIT = 10;

class TranslationsDropdown extends Component {
  componentDidMount() {
    if (!this.props.translationOptions.length) {
      return this.props.loadTranslations();
    }
    return false;
  }

  handleRemoveContent = () => {
    const { onOptionChange } = this.props;

    onOptionChange({ translations: [] });
  };

  handleOptionSelected(id) {
    const { onOptionChange, translations } = this.props;
    if (translations.find(option => option === id)) {
      onOptionChange({
        translations: translations.filter(option => option !== id)
      });
    } else {
      onOptionChange({ translations: [...translations, id] });
    }
  }

  renderItems(items, render) {
    const { translations } = this.props;

    return items.map((translation) => {
      const checked = translations.find(option => option === translation.id);

      return (
        <MenuItem key={translation.id} className={style.item}>
          <Checkbox
            id={translation.id + translation.languageName}
            name="translation"
            checked={checked || false}
            disabled={
              !checked && translations.length >= TRANSLATIONS_SELECTION_LIMIT
            }
            handleChange={() => this.handleOptionSelected(translation.id)}
          >
            <span>{render(translation)}</span>
          </Checkbox>
        </MenuItem>
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

    return this.renderItems(
      list,
      translation => `${translation.languageName} - ${translation.authorName}`
    );
  }

  render() {
    const { translations, translationOptions } = this.props;
    return (
      <MenuItem
        icon={<Icon type="list" />}
        menu={
          translationOptions.length ? (
            <Menu>
              {translations && translations.length ? (
                <MenuItem onClick={this.handleRemoveContent}>
                  <LocaleFormattedMessage
                    id="setting.translations.removeAll"
                    defaultMessage="Remove all"
                  />
                </MenuItem>
              ) : (
                <span />
              )}
              <MenuItem divider>
                <LocaleFormattedMessage
                  id="setting.translations.english"
                  defaultMessage="English"
                />
              </MenuItem>
              {this.renderEnglishList()}
              <MenuItem divider>
                <LocaleFormattedMessage
                  id="setting.translations.other"
                  defaultMessage="Other Languages"
                />
              </MenuItem>
              {this.renderLanguagesList()}
            </Menu>
          ) : (
            <Loader isActive />
          )
        }
      >
        <LocaleFormattedMessage
          id="setting.translations.title"
          defaultMessage="Translations"
        />
      </MenuItem>
    );
  }
}

TranslationsDropdown.propTypes = {
  onOptionChange: PropTypes.func.isRequired,
  translations: PropTypes.arrayOf(PropTypes.number).isRequired,
  translationOptions: customPropTypes.translationOptions,
  loadTranslations: PropTypes.func.isRequired
};

export default connect(
  state => ({
    translationOptions: state.options.options.translations,
    loadingTranslations: state.options.loadingTranslations,
    translations: state.options.translations
  }),
  { loadTranslations }
)(TranslationsDropdown);
