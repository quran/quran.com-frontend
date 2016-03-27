import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import DesktopOptions from 'components/header/DesktopOptions';
import MobileOptions from 'components/header/MobileOptions';
import NavBrand from 'components/header/NavBrand';
import debug from 'utils/Debug';
import $ from 'jquery';
import Title from '../../../containers/Surah/Title';

class MasterHeader extends Component {
  static propTypes = {
    surah: PropTypes.object
  }

  state = {
    showOptions: false,
    showMobile: false,
    showDesktop: true
  }

  showOptions(e) {
    e.preventDefault();
    this.setState({showOptions: !this.state.showOptions});
  }

  renderMobileOptions() {
    if (this.state.showOptions && this.state.showMobile) {
      return <MobileOptions />;
    }
  }

  renderDesktopOptions() {
    if (this.state.showDesktop) {
      return <DesktopOptions />;
    }
  }

  renderNavBrand() {
    return <NavBrand showOptions={this.state.showOptions}
                     showOptionsFn={this.showOptions.bind(this)} />;
  }

  updateDimensions() {
    if (typeof window !== 'undefined') {
      if ($(window).width() > 1000) {
        return;
        // this.setState({showDesktop: true, showMobile: false});
      }
      else {
        this.setState({showDesktop: false, showMobile: true});
      }
    }
  }

  componentDidMount() {
    this.updateDimensions();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateDimensions.bind(this));
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateDimensions.bind(this));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.surah.id !== nextProps.surah.id) {
      return true;
    }
    else if (this.state.showOptions !== nextState.showOptions) {
      return true;
    }
    else if (this.state.width !== nextState.width) {
      return true;
    }
    return false;
  }

  render() {
    const { surah, children } = this.props;

    debug('component:MasterHeader', 'Render');

    return (
      <nav className="navbar navbar-default navbar-fixed-top montserrat shrink" role="navigation">
        <div className="container-fluid">
          <div className="row">
            {/*{this.renderNavBrand()}*/}
            {/*{this.renderMobileOptions()}*/}
            <Title surah={surah} />
          </div>
          {children}
          {/*{this.renderDesktopOptions()}*/}
        </div>
      </nav>
    );
  }
}

export default MasterHeader;
