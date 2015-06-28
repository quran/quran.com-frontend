import React from 'react';
import SearchInput from 'components/header/SearchInput';
import IndexHeaderNav from 'components/header/IndexHeaderNav';
import {NavLink} from 'fluxible-router';

class IndexHeader extends React.Component {
  render() {
    return (
      <div className="index-header">
        <IndexHeaderNav />
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1 text-center">
              <NavLink href="/">
                <img src="images/logo-lg-w.png" className="logo" />
              </NavLink>
              <h4 className="title">THE NOBLE QUR&#x27;AN</h4>
              <SearchInput />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

IndexHeader.displayName = 'IndexHeader';

export default IndexHeader;
