import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Col from 'react-bootstrap/lib/Col';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import SearchInput from 'components/SearchInput';

import debug from 'helpers/debug';

const Header = Navbar.Header;
const Form = Navbar.Form;

// const styles = require('./style.scss');

const GlobalNav = ({ leftControls, rightControls }) => {
  debug('component:GlobalNav', 'Render');

  return (
    <Navbar className="montserrat" fixedTop fluid>
      <button type="button" className="navbar-toggle collapsed">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>
      <Nav>
        {leftControls && leftControls.map(control => control)}
        <Form pullLeft>
          <SearchInput
            className="search-input"
          />
        </Form>
      </Nav>
      {rightControls &&
        <Nav pullRight>
          {rightControls.map(control => control)}
        </Nav>
      }
    </Navbar>
  );
};

GlobalNav.propTypes = {
  // handleToggleSidebar: PropTypes.func.isRequired,
  leftControls: PropTypes.arrayOf(PropTypes.element),
  rightControls: PropTypes.arrayOf(PropTypes.element),
};

export default GlobalNav;
