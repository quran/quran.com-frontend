import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

import QuranNav from 'components/QuranNav';
import userType from 'types/userType';

const styles = require('./style.scss');

class Profile extends Component {
  static propTypes = {
    user: PropTypes.shape(userType),
    bookmarks: PropTypes.object.isRequired
  };

  render() {
    const { user, bookmarks } = this.props;

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
          <Row>
            <Col md={6} mdOffset={3}>
              <Tabs bsStyle="pills" defaultActiveKey={1} className={styles.tabs} id="tabs">
                <Tab eventKey={1} title="Bookmarks">
                  <ul className="list-group">
                    {
                      Object.values(bookmarks).map(bookmark => (
                        <Link to={bookmark.ayahKey.split(':').join('/')} className="list-group-item">
                          {bookmark.ayahKey}
                        </Link>
                      ))
                    }
                  </ul>
                </Tab>
                <Tab eventKey={2} title="Notes">
                  Notes...
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.auth.user,
    bookmarks: state.bookmarks.entities
  })
)(Profile);
