import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { juzAndHizbArabicNum } from './markNumbers';

const juzMarkTop = require('../../../static/images/juzTopArt.svg');
const juzMarkBottom = require('../../../static/images/juzBottomArt.svg');

const StyledContainer = styled.div`
  padding: 0.05em;
  border: solid 1px #2CA4AB;
  width: 0.659em;
  margin-left: calc((100% - 0.659em) / 2);
  margin-top: 0.055em;
  margin-bottom: 0.055em;
}
`;

const StyledJuzArt = styled.img`
  height: 30px;
  width: 0.659em;
  margin-left: calc((100% - 0.659em) / 2);
  display: block;
`;

const StyledJuzNumber = styled.div`
  font-size: 10px;
  width: 100%;
  text-align: center;
  display: block;
`;

const Decoration = ({ juzNumber }) => (
  // Show all the decoration in one component
  <div>
    <StyledJuzArt src={juzMarkTop} alt="juz top Art" />
    <StyledContainer>
      <StyledJuzNumber>جزء</StyledJuzNumber>
      <StyledJuzNumber>{juzAndHizbArabicNum[juzNumber]}</StyledJuzNumber>
      <StyledJuzNumber>حزب</StyledJuzNumber>
      <StyledJuzNumber>
        {juzAndHizbArabicNum[juzNumber * 2 - 1]}
      </StyledJuzNumber>
    </StyledContainer>
    <StyledJuzArt src={juzMarkBottom} alt="juz top Art" />
  </div>
);

Decoration.propTypes = {
  juzNumber: PropTypes.number.isRequired
};

export default Decoration;
