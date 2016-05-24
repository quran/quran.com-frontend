import React from 'react';
import SearchInput from 'components/header/SearchInput';
import Link from 'react-router/lib/Link';

const logo = require('../../../../static/images/logo-lg-w.png');

class SearchHeader extends React.Component {
  render() {
    return (
      <div className="index-header">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1 text-center">
              <Link to="/">
                <img src={logo} className="logo" />
              </Link>
              <h4 className="title">THE NOBLE QUR'AN</h4>
              <SearchInput />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchHeader;
