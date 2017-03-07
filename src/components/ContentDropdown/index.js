import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import { loadTranslations } from 'redux/actions/options';
import { translationType } from 'types';

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
    content: PropTypes.arrayOf(PropTypes.number).isRequired,
    translations: PropTypes.arrayOf(translationType),
    loadTranslations: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  componentDidMount() {
    if (!this.props.translations.length) {
      return this.props.loadTranslations();
    }

    return false;
  }

  getTitle() {
    const { translations, content } = this.props;

    return translations.filter(slug => content.includes(slug.id)).map((slug) => {
      if (slug.languageName === 'English') return slug.authorName;

      return slug.languageName;
    }).join(', ');
  }

  handleRemoveContent = () => {
    const { onOptionChange } = this.props;

    onOptionChange({ content: [] });
  }

  handleOptionSelected(id) {
    const { onOptionChange, content } = this.props;

    if (content.find(option => option === id)) {
      onOptionChange({ content: content.filter(option => option !== id) });
    } else {
      onOptionChange({ content: [...content, id] });
    }
  }

  renderItems(items, key) {
    const { content } = this.props;

    return items.map((translation) => {
      const checked = content.find(option => option === translation.id);

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
            {translation[key]}
          </label>
        </li>
      );
    });
  }

  renderEnglishList() {
    const list = this.props.translations
    .filter(translation => translation.languageName === 'English')
    .sort(compareAlphabetically('authorName'));

    return this.renderItems(list, 'authorName');
  }

  renderLanguagesList() {
    const list = this.props.translations
    .filter(translation => translation.languageName !== 'English')
    .sort(compareAlphabetically('languageName'));

    return this.renderItems(list, 'languageName');
  }

  render() {
    const { className, content } = this.props;

    return (
      <ButtonToolbar>
        <DropdownButton
          block
          id="content-dropdown"
          className={`dropdown ${className} ${style.dropdown}`}
          title={this.getTitle()}
        >
          {
            content.length &&
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
  translations: state.options.options.translations,
  loadingTranslations: state.options.loadingTranslations
}), { loadTranslations })(ContentDropdown);
