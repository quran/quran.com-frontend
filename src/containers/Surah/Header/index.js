import React, { PropTypes } from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Navbar from 'react-bootstrap/lib/Navbar';
const Header = Navbar.Header;
const Brand = Navbar.Brand;
const Toggle = Navbar.Toggle;
const Collapse = Navbar.Collapse;

import debug from '../../../helpers/debug';
import Title from '../../../containers/Surah/Title';

const SurahHeader = ({ surah, children }) => {
  debug('component:SurahHeader', 'Render');

  return (
    <Navbar className="montserrat" fixedTop fluid>
      <Header>
        <Brand>
          <Title surah={surah} />
        </Brand>
        <Toggle />
      </Header>
      <Collapse>
        <Grid fluid>
          {children}
        </Grid>
      </Collapse>
    </Navbar>
  );
};

SurahHeader.propTypes = {
  surah: PropTypes.object.isRequired,
  children: PropTypes.any
};

export default SurahHeader;
