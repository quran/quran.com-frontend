import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavItem from 'react-bootstrap/lib/NavItem';
import Image from 'react-bootstrap/lib/Image';
import userType from 'types/userType';

const Header = Navbar.Header;
const Collapse = Navbar.Collapse;
const Toggle = Navbar.Toggle;

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';


const styles = require('./style.scss');

export const QuranNav = ({ user }) => (
  <Navbar inverse fluid className={styles.nav}>
    <Header>
      <Toggle />
    </Header>
    <Collapse>
      <Nav />
      <Nav pullRight>
        <LinkContainer to="/apps" data-metrics-event-name="IndexHeader:Link:Mobile">
          <NavItem>
            <LocaleFormattedMessage
              id={'nav.mobile'}
              defaultMessage={'Mobile'}
            />
          </NavItem>
        </LinkContainer>
        <NavItem href="https://quran.zendesk.com/hc/en-us/articles/210090626-Development-help" target="_blank" data-metrics-event-name="IndexHeader:Link:Developer">
          <LocaleFormattedMessage
            id={'nav.developers'}
            defaultMessage={'Developers'}
          />
        </NavItem>
        <NavItem href="http://legacy.quran.com" data-metrics-event-name="IndexHeader:Link:Legacy">
          Legacy Quran.com
        </NavItem>
        <LinkContainer to="/donations" data-metrics-event-name="IndexHeader:Link:Contribute">
          <NavItem>
            <LocaleFormattedMessage
              id={'nav.contribute'}
              defaultMessage={'Contribute'}
            />
          </NavItem>
        </LinkContainer>
        <NavItem href="https://quran.zendesk.com/hc/en-us" data-metrics-event-name="IndexHeader:Link:Contact">
          <LocaleFormattedMessage
            id={'nav.contactUs'}
            defaultMessage={'Contact Us'}
          />
        </NavItem>
        {
          user &&
            <NavDropdown
              title={
                <span className={styles.name}>
                  <Image src={user.image} className={styles.image} circle />
                  {user.firstName}
                </span>
              }
              id="user-dropdown"
            >
              <LinkContainer
                to="/profile"
                data-metrics-event-name="IndexHeader:Link:Profile"
              >
                <MenuItem eventKey={3.1}>Profile</MenuItem>
              </LinkContainer>
              <MenuItem eventKey={3.3}>Logout</MenuItem>
            </NavDropdown>
        }
      </Nav>
    </Collapse>
  </Navbar>
);

QuranNav.propTypes = {
  user: PropTypes.shape(userType)
};

export default connect(
  state => ({
    user: state.auth.user
  })
)(QuranNav);
