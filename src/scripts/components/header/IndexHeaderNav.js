import React from 'react';

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
            <a href="http://quran.com">Legacy Quran.com</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default IndexHeaderNav;
