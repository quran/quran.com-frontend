import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { JUZ_AND_HIZB_ARABIC_NUMBERS } from '../constants';

const juzMarkTop = require('../../static/images/juzTopArt.svg');
const juzMarkBottom = require('../../static/images/juzBottomArt.svg');

const StyledContainer = styled.div`
  padding: 1px;
  border: solid 1px #2CA4AB;
  width: 31px;
  margin-left: calc((100% - 31px) / 2);
  margin-top: 0.6px;
  margin-bottom: 1.4px;
}
`;

const StyledJuzArt = styled.img`
  height: 30px;
  width: 31px;
  margin-left: calc((100% - 31px) / 2);
  display: block;
`;

const StyledJuzNumber = styled.div`
  font-size: 10px;
  width: 100%;
  text-align: center;
  display: block;
`;

const propTypes = {
  juzNumber: PropTypes.number.isRequired,
};

type Props = {
  juzNumber: number;
};

const JuzDecoration: React.SFC<Props> = ({ juzNumber }: Props) => (
  <Fragment>
    <StyledJuzArt src={juzMarkTop} alt={`Juz ${juzNumber}`} />
    <StyledContainer>
      <StyledJuzNumber>جزء</StyledJuzNumber>
      <StyledJuzNumber>
        {JUZ_AND_HIZB_ARABIC_NUMBERS[juzNumber]}
      </StyledJuzNumber>
      <StyledJuzNumber>حزب</StyledJuzNumber>
      <StyledJuzNumber>
        {JUZ_AND_HIZB_ARABIC_NUMBERS[juzNumber * 2 - 1]}
      </StyledJuzNumber>
    </StyledContainer>
    <StyledJuzArt src={juzMarkBottom} alt={`Juz ${juzNumber}`} />
  </Fragment>
);

JuzDecoration.propTypes = propTypes;

export default JuzDecoration;
