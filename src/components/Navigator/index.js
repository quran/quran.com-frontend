import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import SearchInput from 'components/SearchInput';

const styles = require('./style.scss');
const Form = Navbar.Form;

class Navigator extends Component {

  constructor(props) {
    console.log("Navigator");
    super(props);
  }

  render() {
    const { location, surah, params} = this.props;
    let nav;
    if (params && params.surahId) {
      nav = (
        <Navbar className="montserrat" fixedTop fluid>
          <button type="button" className="navbar-toggle collapsed">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Nav>
            <Form pullLeft>
              <SearchInput
                className="search-input"
                />
            </Form>
          </Nav>
          <p>I am Surah Nav</p>
        </Navbar>
      )
    } else {
      nav = (
        <Navbar className="montserrat" fixedTop fluid>
          <button type="button" className="navbar-toggle collapsed">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Nav>
            <Form pullLeft>
              <SearchInput
                className="search-input"
                />
            </Form>
          </Nav>
          <p>I am other nav</p>
        </Navbar>

      )
    }

    return (
      <div className={styles.navigator} id="quran-Navigator">
        {nav}
        {this.props.children}
      </div >

    )

  }
}

function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.children.props.location,
    params: ownProps.children.props.params,
    surah: ownProps.children.props.params ? state.surahs.entities[Number(ownProps.children.props.params.surahId)] : {},
    surahs: state.surahs.entities,
    options: state.options
  };
}

export default connect(mapStateToProps)(Navigator);
