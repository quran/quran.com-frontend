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

  links() {
    let classNames = `links ${this.state.open ? 'open' : ''}`;

    if (this.props.navlink === false) {
      return (
        <ul className={classNames}>
          <li>
            <a href="http://legacy.quran.com">Legacy Quran.com</a>
          </li>
          <li>
            <a href="/donations">
              Contribute
            </a>
          </li>
          <li>
            <a href="/contact">
              Contact us
            </a>
          </li>
        </ul>
      );
    }
    else {
      return (
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
      );
    }
  }

  render() {
    return (
      <div className="nav">
        {this.links()}
      </div>
    );
  }
}

export default IndexHeaderNav;
