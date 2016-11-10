import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';

import QuranNav from 'components/QuranNav';
import userType from 'types/userType';

const styles = require('./style.scss');

@connect(
  state => ({
    user: state.auth.user
  })
)
export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.shape(userType)
  };

  render() {
    const { user } = this.props;

    return (
      <div>
        <Helmet title="The Noble Quran - القرآن الكريم" titleTemplate="%s" />
        <QuranNav />
        <div className={styles.header} />
        <Grid>
          <Row>
            <Col md={12} className="text-center">
              <Image src={`${user.image}?type=large`} circle className={styles.image} />
              <h2>
                {user.name}
              </h2>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
