import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

const Header = styled.div`
  background: ${props => props.theme.brandPrimary};
  height: 7rem;
  padding-top: 15px;
`;

const Profile = () => (
  <div className="container">
    <Helmet title="The Noble Quran - القرآن الكريم" titleTemplate="%s" />
    <Header />
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center" />
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3" />
      </div>
    </div>
  </div>
);

export default Profile;
