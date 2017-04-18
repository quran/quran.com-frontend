import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import SearchInput from 'components/SearchInput';
import debug from 'helpers/debug';
import Jumbotron from 'quran-components/lib/Jumbotron';

const logo = require('../../../static/images/logo-lg-w.png');
const styles = require('./style.scss');

class IndexHeader extends Component {
  renderSearch() {
    if (this.props.noSearch) {
      return null;
    }

    return <SearchInput />;
  }

  render() {
    debug('component:IndexHeader', 'Render');

    return (
      <Jumbotron>
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1 text-center">
              <Link
                to="/"
                className={styles.link}
                data-metrics-event-name="IndexHeader:Link:Index"
              >
                <img src={logo} className={styles.logo} alt="logo" />
              </Link>
              <h4 className={styles.title}>THE NOBLE QUR'AN</h4>
              {this.renderSearch()}
            </div>
          </div>
        </div>
      </Jumbotron>
    );
  }
}

IndexHeader.propTypes = {
  noSearch: PropTypes.bool
};

export default IndexHeader;
