import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

import { bookmarkType, userType } from 'types';

const styles = require('./style.scss');

class Profile extends Component { // eslint-disable-line
  static propTypes = {
    user: userType.isRequired,
    bookmarks: bookmarkType.isRequired
  };

  render() {
    const { user, bookmarks } = this.props;

    return (
      <div className="min-container">
        <Helmet title="The Noble Quran - القرآن الكريم" titleTemplate="%s" />
        <div className={styles.header} />
        <Grid>
          <div className="row">
            <Col md={12} className="text-center">
              <Image src={`${user.image}?type=large`} circle className={styles.image} />
              <h2>
                {user.name}
              </h2>
            </Col>
          </div>
          <div className="row">
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
          </div>
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
