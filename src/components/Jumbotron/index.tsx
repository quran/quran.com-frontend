import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import SearchInput from 'components/SearchInput';
import styled from 'styled-components';

import backgroundImage from '../../../static/images/background.jpg';
import logo from '../../../static/images/logo-lg-w.png';

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
  color: ${({ theme }) => theme.colors.white};
  font-size: 160%;
  padding-bottom: 3.5%;
`;

const Container = styled.div`
  text-align: center;
  background-color: ${({ theme }) => theme.brandPrimary || '#2CA4AB'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 1rem 0rem;
  color: #fff;
`;

type Props = {
  noSearch?: boolean;
};

const Jumbotron: React.SFC<Props> = ({ noSearch }: Props) => (
  <Container style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="container">
      <div className="row">
        <div className="col-md-10 col-md-offset-1 text-center">
          <StyledLink to="/" data-metrics-event-name="Jumbotron:Link:Index">
            <Logo src={logo} alt="logo" />
          </StyledLink>
          {/* TODO: Translations */}
          <Title>THE NOBLE QURAN</Title>
          {noSearch}
          {/* {!noSearch && <SearchInput />} */}
        </div>
      </div>
    </div>
  </Container>
);

Jumbotron.propTypes = {
  noSearch: PropTypes.bool,
};

Jumbotron.defaultProps = {
  noSearch: false,
};

export default Jumbotron;
