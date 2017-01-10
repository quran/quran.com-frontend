import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';

import SearchInput from 'components/SearchInput';
import debug from 'helpers/debug';

import Nav from './Nav';

const logo = require('../../../static/images/logo-lg-w.png');

export default class IndexHeader extends Component {
  static propTypes = {
    noSearch: PropTypes.bool
  };

  renderSearch() {
    if (this.props.noSearch) {
      return null;
    }

    return (
      <SearchInput />
    );
  }

  render() {
    debug('component:IndexHeader', 'Render');

    return (
      <div className="index-header" style={{ backgroundColor: '#2CA4AB' }}>
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1 text-center">
              <Link to="/" data-metrics-event-name="IndexHeader:Link:Index">
                <img src={logo} className="logo" alt="logo" />
              </Link>
              <h4 className="title">THE NOBLE QUR&#x27;AN</h4>
              {this.renderSearch()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
