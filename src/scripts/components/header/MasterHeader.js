import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Navbar from 'react-bootstrap/lib/Navbar';

import NavBrand from 'components/header/NavBrand';
import debug from 'utils/Debug';
import Title from '../../../containers/Surah/Title';

const MasterHeader = ({ surah, children }) => {
  debug('component:MasterHeader', 'Render');

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

MasterHeader.propTypes = {
  surah: PropTypes.object.isRequired
};

export default MasterHeader;
