import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';

import { surahType, optionsType } from 'types';
import * as OptionsActions from 'redux/actions/options.js';

import SurahsDropdown from 'components/SurahsDropdown';
import ReadingModeToggle from 'components/ReadingModeToggle';
import NightModeToggle from 'components/NightModeToggle';
import FontSizeDropdown from 'components/FontSizeDropdown';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
// TODO: import VersesDropdown from 'components/VersesDropdown';
import InformationToggle from 'components/InformationToggle';
import GlobalNav from '../index';

const styles = require('../style.scss');

const GlobalNavSurah = ({ surah, surahs, setOption, options, ...props }) => (
  <GlobalNav
    {...props}
    leftControls={[
      <SurahsDropdown title={surah.name.simple} surahs={surahs} />,
      <NavDropdown
        id="hidden-dropdown"
        className={`visible-xs-inline-block ${styles.optionsDropdown}`}
        title={<LocaleFormattedMessage id="settings.options" defaultMessage="Options" />}
      >
        <FontSizeDropdown
          fontSize={options.fontSize}
          onOptionChange={setOption}
        />
        <InformationToggle
          onToggle={setOption}
          isToggled={options.isShowingSurahInfo}
        />
        <ReadingModeToggle
          isToggled={options.isReadingMode}
          onToggle={setOption}
        />
        <NightModeToggle />
      </NavDropdown>
    ]}
    rightControls={[
      <FontSizeDropdown
        fontSize={options.fontSize}
        onOptionChange={setOption}
      />,
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

  return {
    surah,
    surahs: state.surahs.entities,
    options: state.options
  };
}

export default connect(mapStateToProps, OptionsActions)(GlobalNavSurah);
