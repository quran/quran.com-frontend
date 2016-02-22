import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class ImageHeaderNav extends Component {
  render() {
    return (
      <Navbar fluid inverse>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse eventKey={0}>
          <Nav navbar pullRight>
            <NavItem href="http://legacy.quran.com">
              Legacy Quran.com
            </NavItem>
            <LinkContainer to="/donations">
              <NavItem>Contribute</NavItem>
            </LinkContainer>
            <NavItem href="https://quran.zendesk.com/hc/en-us">
              Contact us
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
