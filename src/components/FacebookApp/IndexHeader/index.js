import React, { Component, PropTypes } from 'react';
import SearchInput from 'components/SearchInput';
import debug from 'helpers/debug';
import Jumbotron from 'quran-components/lib/Jumbotron';

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
            <div
              className={`col-md-10 col-md-offset-1 text-center ${styles.header}`}
            >
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
