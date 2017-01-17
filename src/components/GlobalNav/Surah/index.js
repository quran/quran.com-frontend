import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { surahType, optionsType } from 'types';
import * as OptionsActions from 'redux/actions/options.js';

import SurahsDropdown from 'components/SurahsDropdown';
import ReadingModeToggle from 'components/ReadingModeToggle';
import NightModeToggle from 'components/NightModeToggle';
// TODO: import VersesDropdown from 'components/VersesDropdown';
import InformationToggle from 'components/InformationToggle';
import GlobalNav from '../index';

const GlobalNavSurah = ({ surah, surahs, setOption, options }) => (
  <GlobalNav
    leftControls={[
      <SurahsDropdown title={surah.name.simple} surahs={surahs} />,
    ]}
    rightControls={[
      <InformationToggle
        onToggle={setOption}
        isToggled={options.isShowingSurahInfo}
      />,
      <ReadingModeToggle
        isToggled={options.isReadingMode}
        onToggle={setOption}
      />,
      <NightModeToggle />
    ]}
  />
);

GlobalNavSurah.propTypes = {
  surah: surahType.isRequired,
  surahs: PropTypes.objectOf(surahType).isRequired,
  options: optionsType.isRequired,
  setOption: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const surahId = parseInt(ownProps.params.surahId, 10);
  const surah: Object = state.surahs.entities[surahId];
  const ayahs: Object = state.ayahs.entities[surahId];
  const ayahArray = ayahs ? Object.keys(ayahs).map(key => parseInt(key.split(':')[1], 10)) : [];
  const ayahIds = new Set(ayahArray);
  const lastAyahInArray = ayahArray.slice(-1)[0];

  return {
    surah,
    ayahs,
    ayahIds,
    isStarted: state.audioplayer.isStarted,
    isPlaying: state.audioplayer.isPlaying,
    currentAyah: state.audioplayer.currentAyah,
    isAuthenticated: state.auth.loaded,
    currentWord: state.ayahs.currentWord,
    isEndOfSurah: lastAyahInArray === surah.ayat,
    surahs: state.surahs.entities,
    bookmarks: state.bookmarks.entities,
    isLoading: state.ayahs.loading,
    isLoaded: state.ayahs.loaded,
    lines: state.lines.lines,
    options: state.options
  };
}

export default connect(mapStateToProps, OptionsActions)(GlobalNavSurah);
