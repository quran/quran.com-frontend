import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import SearchInput from 'components/SearchInput';

const styles = require('./style.scss');
const Form = Navbar.Form;

class Navigator extends Component {

  // childContext;

  // getChildContext() {
  //   return this.childContext;
  // }

  constructor(props) {
    console.log("Navigator");
    super(props);
  }

  // componentWillMount() {
  //   this.childContext = {
  //     location: this.props.location
  //   };
  // }

  render() {
    const { location, surah} = this.props;
    console.log(location, surah);
    return (
      <div className={styles.navigator} id="quran-Navigator">
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
          <p>Hello Test</p>
        </Navbar>
        {this.props.children}
      </div >
    )
  }
}

// Navigator.childContextTypes = {
//   location: PropTypes.any
// };

// Navigator.contextTypes = {
//   location: PropTypes.any
// };


function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.children.props.location,
    surah: ownProps.children.props.params ? state.surahs.entities[Number(ownProps.children.props.params.surahId)] : {},
    surahs: state.surahs.entities,
    options: state.options
  };
}

export default connect(mapStateToProps)(Navigator);
