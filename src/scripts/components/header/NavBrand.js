import React from 'react';
import Link from 'react-router/lib/Link';

const logo = require('../../../../static/images/logo-md-w.png');

class NavBrand extends React.Component {
  render() {
    return (
      <div className="col-md-12 col-xs-12 navbar-brand">
        <Link to="/">
          <img src={logo} alt="" className="logo" />
        </Link>
        <span className="title">THE NOBLE QURAN</span>
        <span className="menu visible-xs"
              onClick={this.props.showOptionsFn}>
          MENU
        </span>
      </div>
    );
  }
}

export default NavBrand;
