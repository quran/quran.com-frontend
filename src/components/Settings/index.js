import React, { Component } from 'react';
import * as customPropTypes from 'customPropTypes';
import * as OptionsActions from 'redux/actions/options.js';
import ChapterInfoToggle from './ChapterInfoToggle';
import { connect } from 'react-redux';
import FontSizeOptions from './FontSizeOptions';
import { load } from 'redux/actions/verses.js';
import LocaleSwitcher from 'components/LocaleSwitcher';
import Menu from 'quran-components/lib/Menu';
import NightModeToggle from './NightModeToggle';
import PropTypes from 'prop-types';
import ReadingModeToggle from './ReadingModeToggle';
import ReciterDropdown from './ReciterDropdown';
import TranslationsDropdown from './TranslationsDropdown';
import TooltipOptions from './TooltipOptions';

class Settings extends Component {
  handleOptionChange = (payload) => {
    const { chapter, setOption, options, versesIds } = this.props;

    setOption(payload);

    if (chapter) {
      const from = [...versesIds][0];
      const to = [...versesIds][[...versesIds].length - 1];
      const paging = { offset: from - 1, limit: to - from + 1 };
      this.props.load(chapter.chapterNumber, paging, {
        ...options,
        ...payload
      });
    }
  };

  render() {
    const { setOption, options } = this.props;

    return (
      <Menu>
        <ChapterInfoToggle
          onToggle={setOption}
          isToggled={options.isShowingSurahInfo}
        />
        <ReadingModeToggle
          isToggled={options.isReadingMode}
          onToggle={setOption}
        />
        <NightModeToggle
          isNightMode={options.isNightMode}
          onToggle={setOption}
        />
        <hr />
        <ReciterDropdown onOptionChange={this.handleOptionChange} />
        <TranslationsDropdown onOptionChange={this.handleOptionChange} />
        <TooltipOptions tooltip={options.tooltip} onOptionChange={setOption} />
        <hr />
        <FontSizeOptions
          fontSize={options.fontSize}
          onOptionChange={setOption}
        />
        <hr />
        <LocaleSwitcher renderAs="menu" />
      </Menu>
    );
  }
}

Settings.propTypes = {
  setOption: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  chapter: customPropTypes.surahType.isRequired,
  options: customPropTypes.optionsType.isRequired,
  versesIds: PropTypes.instanceOf(Set)
};

function mapStateToProps(state) {
  return {
    options: state.options
  };
}

export default connect(mapStateToProps, {
  ...OptionsActions,
  load
})(Settings);
