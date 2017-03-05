import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { surahType } from 'types';
import GlobalSidebar from '../index.js';

const GlobalSidebarSurah = ({ ...props, chapter, versesIds }) => (
  <GlobalSidebar {...props} settingsModalProps={{ chapter, versesIds }} />
);

GlobalSidebarSurah.propTypes = {
  chapter: surahType,
  versesIds: PropTypes.instanceOf(Set)
};

function mapStateToProps(state, ownProps) {
  const chapterId = parseInt(ownProps.params.chapterId, 10);
  const chapter: Object = state.chapters.entities[chapterId];
  const ayahs: Object = state.verses.entities[chapterId];
  const ayahArray = ayahs ? Object.keys(ayahs).map(key => parseInt(key.split(':')[1], 10)) : [];
  const versesIds = new Set(ayahArray);

  return {
    chapter,
    versesIds
  };
}

export default connect(mapStateToProps)(GlobalSidebarSurah);
