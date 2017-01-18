import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { surahType } from 'types';
import GlobalSidebar from '../index.js';

const GlobalSidebarSurah = ({ ...props, surah, ayahIds }) => (
  <GlobalSidebar {...props} settingsModalProps={{ surah, ayahIds }} />
);

GlobalSidebarSurah.propTypes = {
  surah: surahType,
  ayahIds: PropTypes.instanceOf(Set)
};

function mapStateToProps(state, ownProps) {
  const surahId = parseInt(ownProps.params.surahId, 10);
  const surah: Object = state.surahs.entities[surahId];
  const ayahs: Object = state.ayahs.entities[surahId];
  const ayahArray = ayahs ? Object.keys(ayahs).map(key => parseInt(key.split(':')[1], 10)) : [];
  const ayahIds = new Set(ayahArray);

  return {
    surah,
    ayahIds
  };
}

export default connect(mapStateToProps)(GlobalSidebarSurah);
