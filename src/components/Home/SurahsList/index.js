import React from 'react';
import styled from 'styled-components';
import * as customPropTypes from 'customPropTypes';

import ChapterItem from 'components/Home/ChapterItem';

const List = styled.ul`padding-left: 0px;`;

const SurahsList = ({ chapters }) =>
  <List className="col-md-4">
    {chapters.map(chapter => <ChapterItem chapter={chapter} />)}
  </List>;

SurahsList.propTypes = {
  chapters: customPropTypes.chapters.isRequired
};

export default SurahsList;
