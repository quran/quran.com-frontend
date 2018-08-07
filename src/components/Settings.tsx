import React, { Component } from 'react';
import PropTypes from 'prop-types';
import last from 'lodash/last';
import Menu from 'quran-components/lib/Menu';
import LocaleSwitcher from './LocaleSwitcher';
import FontSizeOptions from './settings/FontSizeOptions';
import ReadingModeToggle from './settings/ReadingModeToggle';
import NightModeToggle from './settings/NightModeToggle';
import ChapterInfoToggle from './settings/ChapterInfoToggle';
import ReciterDropdown from './settings/ReciterDropdown';
import TranslationsDropdown from './settings/TranslationsDropdown';
import TooltipOptions from './settings/TooltipOptions';
import { VerseShape, ChapterShape, SettingsShape } from '../shapes';
import { SetSetting } from '../redux/actions/settings';
import { FetchVerses } from '../redux/actions/verses';

const propTypes = {
  setSetting: PropTypes.func.isRequired,
  fetchVerses: PropTypes.func.isRequired,
  chapter: ChapterShape.isRequired,
  settings: SettingsShape.isRequired,
  verses: PropTypes.shape({
    verseKey: VerseShape,
  }).isRequired,
};

type Props = {
  setSetting: SetSetting;
  fetchVerses: FetchVerses;
  chapter: ChapterShape;
  settings: SettingsShape;
  verses: { [verseKey: string]: VerseShape };
};

class Settings extends Component<Props> {
  static propTypes = propTypes;

  handleSettingChange = (payload: $TsFixMe) => {
    const { chapter, setSetting, settings, fetchVerses, verses } = this.props;

    setSetting(payload);

    if (chapter) {
      const from = Object.values(verses)[0].verseNumber;
      const lastVerse: VerseShape = last(Object.values(verses));
      const to = lastVerse.verseNumber;
      const paging = { offset: from - 1, limit: to - from + 1 };

      fetchVerses(
        chapter.chapterNumber,
        paging,
        {
          ...settings,
          ...payload,
        },
        settings
      );
    }
  };

  render() {
    const { setSetting, settings } = this.props;

    return (
      <Menu>
        <ChapterInfoToggle
          onToggle={setSetting}
          isToggled={settings.isShowingChapterInfo}
        />
        <ReadingModeToggle
          isToggled={settings.isReadingMode}
          onToggle={setSetting}
        />
        <NightModeToggle
          isNightMode={settings.isNightMode}
          onToggle={setSetting}
        />
        <hr />
        <ReciterDropdown onOptionChange={this.handleSettingChange} />
        <TranslationsDropdown onOptionChange={this.handleSettingChange} />
        <TooltipOptions
          tooltip={settings.tooltip}
          onOptionChange={setSetting}
        />
        <hr />
        <FontSizeOptions
          fontSize={settings.fontSize}
          onOptionChange={setSetting}
        />
        <hr />
        <LocaleSwitcher renderAs="menu" />
      </Menu>
    );
  }
}

export default Settings;
