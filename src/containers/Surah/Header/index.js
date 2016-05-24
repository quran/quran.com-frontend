import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';

import Navbar from 'react-bootstrap/lib/Navbar';

import debug from '../../../helpers/debug';
import Title from '../../../containers/Surah/Title';

const Header = ({ surah, children }) => {
  debug('component:Header', 'Render');

  return (
    <Navbar className="montserrat" fixedTop fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <Title surah={surah} />
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
      <div className="container-fluid">
        {children}
      </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  surah: PropTypes.object.isRequired
};

export default Header;
