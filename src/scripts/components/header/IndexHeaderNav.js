import React from 'react';
import {NavLink} from 'fluxible-router';

class IndexHeaderNav extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  };

  openNav(e) {
    e.preventDefault();

    this.setState({open: !this.state.open});
  };

  render() {
    let classNames = `links ${this.state.open ? 'open' : ''}`;

    return(
      <div className="nav">
        <ul className={classNames}>
          <li>
            <a href="http://legacy.quran.com">Legacy Quran.com</a>
          </li>
          <li>
            <NavLink href="/donations">
              Contribute
            </NavLink>
          </li>
          <li>
            <NavLink href="/contact">
              Contact us
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default IndexHeaderNav;
