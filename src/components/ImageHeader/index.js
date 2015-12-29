import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { IndexLink } from 'react-router';

import debug from 'helpers/debug';

import SearchInput from 'components/SearchInput';

const logoImage = require('../../../static/images/logo-lg-w.png');
const style = require('./style.scss');

export default class ImageHeader extends Component {
  link() {
    return (
      <IndexLink to="/">
        <img src={logoImage} className={style.logo} />
      </IndexLink>
    );
  }

  render() {
    debug('component:IndexHeader', 'Render');

    return (
      <div className={style.header} style={{backgroundColor: '#2CA4AB'}}>
        <Grid>
          <Row>
            <Col md={10} mdOffset={1} className="text-center">
              {this.link()}
              <h4 className={style.title}>THE NOBLE QUR&#x27;AN</h4>
              <SearchInput />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
