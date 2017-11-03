import React from 'react';
import styled from 'styled-components';
import * as customPropTypes from 'customPropTypes';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/lib/Image';

const Header = styled.div`
  background: ${props => props.theme.brandPrimary};
  height: 7rem;
  padding-top: 15px;
`;

const StyledImage = styled(Image)`
margin: -70px auto 40px;
  display: block;
  height: 10rem;
  `;

const Profile = ({ user }) =>
  <div className="container">
    <Helmet title="The Noble Quran - القرآن الكريم" titleTemplate="%s" />
    <Header />
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <StyledImage src={`${user.image}?type=large`} circle />
          <h2>
            {user.name}
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3" />
      </div>
    </div>
  </div>;

Profile.propTypes = {
  user: customPropTypes.userType.isRequired
};

export default connect(state => ({
  user: state.auth.user,
  bookmarks: state.bookmarks.entities
}))(Profile);
