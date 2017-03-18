import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';

import { surahType, optionsType } from 'types';
import * as OptionsActions from 'redux/actions/options.js';

import SearchInput from 'components/SearchInput';
import SurahsDropdown from 'components/SurahsDropdown';
import ReadingModeToggle from 'components/ReadingModeToggle';
import NightModeToggle from 'components/NightModeToggle';
import FontSizeDropdown from 'components/FontSizeDropdown';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
// TODO: import VersesDropdown from 'components/VersesDropdown';
import InformationToggle from 'components/InformationToggle';
import GlobalNav from '../index';

const styles = require('../style.scss');

const GlobalNavSurah = ({ chapter, chapters, setOption, options, ...props }) => (
  <GlobalNav
    {...props}
    leftControls={[
      <SurahsDropdown title={chapter.nameSimple} chapters={chapters} />,
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
        <NightModeToggle
          isNightMode={options.isNightMode}
          onToggle={setOption}
        />
      </NavDropdown>,
      <div className="navbar-form navbar-left hidden-xs hidden-sm">
        <SearchInput className="search-input" />
      </div>,
      <li className="visible-xs-inline-block visible-sm-inline-block">
        <Link to="/search">
          <i className="ss-icon ss-search" style={{ verticalAlign: 'sub' }} />
        </Link>
      </li>
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
      <NightModeToggle
        isNightMode={options.isNightMode}
        onToggle={setOption}
      />
    ]}
  />
);

GlobalNavSurah.propTypes = {
  chapter: surahType.isRequired,
  chapters: PropTypes.objectOf(surahType).isRequired,
  options: optionsType.isRequired,
  setOption: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const chapterId = parseInt(ownProps.params.chapterId, 10);
  const chapter: Object = state.chapters.entities[chapterId];

  return {
    chapter,
    chapters: state.chapters.entities,
    options: state.options
  };
}

export default connect(mapStateToProps, OptionsActions)(GlobalNavSurah);
