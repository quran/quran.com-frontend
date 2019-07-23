import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu, { MenuItem } from 'quran-components/lib/Menu';
import Checkbox from 'quran-components/lib/Checkbox';
import Icon from 'quran-components/lib/Icon';
import T, { KEYS } from '../T';
import { SetSetting, SetSettingPayload } from '../../redux/actions/settings';
import { TranslationShape } from '../../shapes';
import { FetchTranslations } from '../../redux/actions/options';

const compareAlphabetically = (property: string) => (
  previous: TranslationShape & { [key: string]: string },
  next: TranslationShape & { [key: string]: string }
) => {
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

const propTypes = {
  setSetting: PropTypes.func.isRequired,
  translationSettings: PropTypes.arrayOf(PropTypes.number).isRequired,
  translationOptions: PropTypes.arrayOf(TranslationShape),
  fetchTranslations: PropTypes.func.isRequired,
};

const defaultProps: { translationOptions: Array<TranslationShape> } = {
  translationOptions: [],
};

type Props = {
  setSetting: (payload: SetSettingPayload) => void;
  translationOptions: Array<TranslationShape>;
  translationSettings: Array<number>;
  fetchTranslations: FetchTranslations;
};

class TranslationsDropdown extends Component<Props> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentDidMount() {
    const { translationOptions, fetchTranslations } = this.props;

    if (!translationOptions.length) {
      return fetchTranslations();
    }

    return null;
  }

  handleRemoveContent = () => {
    const { setSetting } = this.props;

    setSetting({ translations: [] });
  };

  handleOptionSelected(id: number) {
    const { setSetting, translationSettings } = this.props;
    if (translationSettings.find(option => option === id)) {
      setSetting({
        translations: translationSettings.filter(option => option !== id),
      });
    } else {
      setSetting({ translations: [...translationSettings, id] });
    }
  }

  renderItems(
    items: Array<TranslationShape>,
    render: (translation: TranslationShape) => string
  ) {
    const { translationSettings } = this.props;

    return items.map(translationOption => {
      const checked = translationSettings.find(
        translationSetting => translationSetting === translationOption.id
      );
      const id = translationOption.id + (translationOption.languageName || '');

      return (
        <MenuItem key={translationOption.id}>
          <Checkbox
            id={id}
            name="translation"
            checked={checked || false}
            disabled={
              !checked &&
              translationSettings.length >= TRANSLATIONS_SELECTION_LIMIT
            }
            handleChange={() => this.handleOptionSelected(translationOption.id)}
          >
            <span>{render(translationOption)}</span>
          </Checkbox>
        </MenuItem>
      );
    });
  }

  renderEnglishList() {
    const { translationOptions } = this.props;

    const list = translationOptions
      .filter(translation => translation.languageName === 'English')
      .sort(compareAlphabetically('authorName'));

    return this.renderItems(
      list,
      (translation: TranslationShape) => translation.authorName || ''
    );
  }

  renderLanguagesList() {
    const { translationOptions } = this.props;

    const list = translationOptions
      .filter(translation => translation.languageName !== 'English')
      .sort(compareAlphabetically('languageName'));

    return this.renderItems(
      list,
      (translation: TranslationShape) =>
        `${translation.languageName} - ${translation.authorName}`
    );
  }

  render() {
    const { translationSettings } = this.props;
    return (
      <MenuItem
        icon={<Icon type="list" />}
        menu={
          <Menu>
            {translationSettings.length > 0 && (
              <MenuItem onClick={this.handleRemoveContent}>
                <T id={KEYS.SETTING_TRANSLATIONS_REMOVEALL} />
              </MenuItem>
            )}

            <MenuItem divider>
              <T id={KEYS.SETTING_TRANSLATIONS_ENGLISH} />
            </MenuItem>

            {this.renderEnglishList()}
            <MenuItem divider>
              <T id={KEYS.SETTING_TRANSLATIONS_OTHER} />
            </MenuItem>
            {this.renderLanguagesList()}
          </Menu>
        }
      >
        <T id={KEYS.SETTING_TRANSLATIONS_TITLE} />
      </MenuItem>
    );
  }
}

export default TranslationsDropdown;
