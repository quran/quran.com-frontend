import React, { PropTypes } from 'react';

import Grid from 'react-bootstrap/lib/Grid';
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
        <Grid fluid>
          {children}
        </Grid>
      </Navbar.Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  surah: PropTypes.object.isRequired,
  children: PropTypes.any
};

export default Header;
