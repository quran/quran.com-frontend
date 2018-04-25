import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchInput from 'components/SearchInput';
import styled from 'styled-components';

import backgroundImage from '../../../../static/images/background.jpg';
import logo from '../../../../static/images/logo-lg-w.png';

const StyledLink = styled(Link)`
  display: inline-block;
  width: 30%;
  margin-top: 35px;
`;

const Logo = styled.img`
  padding-top: 10px;
  padding-bottom: 10px;
  height: auto;
  width: 100%;
`;

const Title = styled.h4`
  color: ${props => props.theme.colors.white};
  font-size: 160%;
  padding-bottom: 3.5%;
`;

const Container = styled.div`
  text-align: center;
  background-color: ${props => props.theme.brandPrimary || '#2CA4AB'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 1rem 0rem;
  color: #fff;
`;

const IndexHeader = props => (
  <Container style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="container">
      <div className="row">
        <div className="col-md-10 col-md-offset-1 text-center">
          <StyledLink to="/" data-metrics-event-name="IndexHeader:Link:Index">
            <Logo src={logo} alt="logo" />
          </StyledLink>
          <Title>THE NOBLE QURAN</Title>
          {!props.noSearch && <SearchInput />}
        </div>
      </div>
    </div>
  </Container>
);

IndexHeader.propTypes = {
  noSearch: PropTypes.bool
};

export default IndexHeader;
