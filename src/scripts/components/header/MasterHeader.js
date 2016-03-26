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

  // Disable hyperlink for previous surah if surah is Al-Faatihah.
  previousChapter() {
    const { surah } = this.props;

    if (surah.id <= 1){
      return null;
    } else {
      return (
        <Link className="navbar-text previous-chapter" to={`/${surah.id - 1}`}>
          <i className="ss-icon ss-navigateleft"></i>
          <span className="hidden-xs hidden-sm"> PREVIOUS SURAH</span>
        </Link>
      );
    }
  }

  // Disable hyperlink for next surah if surah is An-Nas.
  nextChapter() {
    const { surah } = this.props;

    if (surah.id >= 114){
      return null;
    }
    else {
      return (
        <Link className="navbar-text next-chapter" to={`/${surah.id + 1}`}>
          <span className="hidden-xs hidden-sm">NEXT SURAH </span>
          <i className="ss-icon ss-navigateright"></i>
        </Link>
      );
    }
  }

  surahTitle() {
    const { surah } = this.props;

    function zeroPad(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join('0') + num;
    }

    if (surah) {
      return (
        <img src={'//quran-1f14.kxcdn.com/images/titles/' + zeroPad(surah.id, 3) + '.svg'} className="title"/>
      );
    }
  }

  surahName() {
    const { surah } = this.props;

    if (surah) {
      return (
        <p className="navbar-text text-uppercase surah-name">
          {surah.name.simple} ({surah.name.english})
        </p>
      );
    }
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
    const { surah } = this.props;

    debug('component:MasterHeader', 'Render');

    return (
      <nav className="navbar navbar-default navbar-fixed-top montserrat shrink" role="navigation">
        <div className="container-fluid">
          <div className="row">
            {/*{this.renderNavBrand()}*/}
            {/*{this.renderMobileOptions()}*/}
            <Title surah={surah} />
          </div>
          {/*{this.renderDesktopOptions()}*/}
        </div>
      </nav>
    );
  }
}

export default MasterHeader;
