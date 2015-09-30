import React from 'react';
import {NavLink} from 'fluxible-router';

class IndexHeaderNav extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  openNav(e) {
    e.preventDefault();

    this.setState({open: !this.state.open});
  }

  links() {
    let classNames = `links ${this.state.open ? 'open' : ''}`;

    if (this.props.navlink === false) {
      return (
        <ul className={classNames}>
          <li>
            <a href="http://legacy.quran.com">Legacy Quran.com</a>
          </li>
          <li>
            <a href="https://quran.zendesk.com/hc/en-us">
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
            <a href="https://quran.zendesk.com/hc/en-us">
              Contact us
            </a>
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
