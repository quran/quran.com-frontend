/* global window */
import React, { PropTypes, Component } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

import SearchInput from 'components/SearchInput';

import debug from 'helpers/debug';

const Form = Navbar.Form;

const styles = require('./style.scss');

class GlobalNav extends Component {
  static propTypes = {
    // handleToggleSidebar: PropTypes.func.isRequired,
    leftControls: PropTypes.arrayOf(PropTypes.element),
    rightControls: PropTypes.arrayOf(PropTypes.element),
  };

  state = {
    scrolled: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleNavbar, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleNavbar, true);
  }

  handleNavbar = () => {
    const { scrolled } = this.state;

    if (window.pageYOffset > 50) {
      if (!scrolled) {
        this.setState({ scrolled: true });
      }
    } else if (scrolled) {
      this.setState({ scrolled: false });
    }

    return false;
  }

  render() {
    const { leftControls, rightControls } = this.props;
    debug('component:GlobalNav', 'Render');

    return (
      <Navbar
        className={`montserrat ${this.state.scrolled && styles.scrolled}`}
        fixedTop
        fluid
      >
        <button type="button" className="navbar-toggle collapsed">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <Nav>
          {leftControls && leftControls.map(control => control)}
          <Form pullLeft>
            <SearchInput
              className="search-input"
            />
          </Form>
        </Nav>
        {rightControls &&
          <Nav pullRight>
            {rightControls.map(control => control)}
          </Nav>
        }
      </Navbar>
    );
  }
}

export default GlobalNav;
