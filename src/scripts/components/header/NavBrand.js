import React from 'react';
import {NavLink} from 'fluxible-router';

class NavBrand extends React.Component {
  render() {
    // let className = this.props.showOptions ? 'ss-icon ss-directup' : 'ss-icon ss-dropdown';
    let className= '';
    return (
      <div className="col-md-12 col-xs-12 navbar-brand">
        <NavLink href="/">
          <img src="/images/logo-md-w.png" alt="" className="logo" />
        </NavLink>
        <span className="title">THE NOBLE QURAN</span>
        <span className="menu visible-xs"
              onClick={this.props.showOptions}>
          MENU <i className={className} />
        </span>
      </div>
    );
  }
};

export default NavBrand;
