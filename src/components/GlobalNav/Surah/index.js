import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { surahType, optionsType } from 'types';
import * as OptionsActions from 'redux/actions/options.js';

import SurahsDropdown from 'components/SurahsDropdown';
import InformationToggle from 'components/InformationToggle';
import GlobalNav from '../index';

const GlobalNavSurah = ({ surah, surahs, setOption, options }) => (
  <GlobalNav
    leftControls={[<SurahsDropdown title={surah.name.simple} surahs={surahs} />]}
    rightControls={[
      <li>
        <InformationToggle
          onToggle={setOption}
          isShowingSurahInfo={options.isShowingSurahInfo}
        />
      </li>
    ]}
  />
);

GlobalNavSurah.propTypes = {
  surah: surahType.isRequired,
  surahs: PropTypes.objectOf(surahType).isRequired,
  options: optionsType.isRequired
};

export default connect((state, ownProps) => ({
  surah: state.surahs.entities[parseInt(ownProps.params.surahId, 10)],
  surahs: state.surahs.entities,
  options: state.options
}), OptionsActions)(GlobalNavSurah);
