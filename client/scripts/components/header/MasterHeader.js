import React from 'react';
import {NavLink} from 'fluxible-router';
import SurahsStore from 'stores/SurahsStore';
import {connectToStores, provideContext} from 'fluxible/addons';
import DesktopOptions from 'components/header/DesktopOptions';

class MasterHeader extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      showOptions: false
    };
  }

  showOptions(e) {
    e.preventDefault();
    this.setState({showOptions: !this.state.showOptions});
  }

  previousChapter() {
    if (this.props.surahId) {
      var prev = '/' + (this.props.surahId - 1);
      return (
        <NavLink className="navbar-text" href={prev}>
          <i className="fa fa-chevron-left"></i>
          <span className="hidden-xs">&nbsp;Previous Chapter</span>
        </NavLink>
      );
    }
  }

  nextChapter() {
    if (this.props.surahId) {
      var next = '/' + (parseInt(this.props.surahId) + 1);
      return (
        <NavLink className="navbar-text" href={next}>
          <span className="hidden-xs">Next Chapter&nbsp;</span>
          <i className="fa fa-chevron-right"></i>
        </NavLink>
      );
    }
  }

  surahTitle() {
    function zeroPad(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
    }

    if (this.props.surahId && this.props.surah) {
      return (
        <img src={'/images/titles/' + zeroPad(this.props.surah.id, 3) + '.svg'} className="title"/>
      );
    }
  }

  surahName() {
    if (this.props.surahId && this.props.surah) {
      return (
        <p className="navbar-text text-uppercase">
          {this.props.surah.name.simple}&nbsp;
          ({this.props.surah.name.english})
        </p>
      );
    }
  }

  renderMobileOptions() {
    if (this.state.showOptions) {
      // return <MobileOptions />;
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top montserrat" role="navigation">
        <div className="container-fluid">
          <div className="row">
            <a className="col-md-2 col-xs-12 navbar-brand">
                <img src="/images/logo-md-w.png" alt="" className="logo" />
                <span className="title">THE NOBLE QURAN</span>
                <span className="menu visible-xs"
                      onClick={this.showOptions}>
                      MENU <i className="fa fa-caret-down"></i>
                </span>
            </a>
            {this.renderMobileOptions()}
            <div className="col-md-3 col-xs-3 surah-title">
              <img src="/images/ornament-left.png" className="ornament" />
              {this.previousChapter()}
            </div>
            <div className="col-md-4 col-xs-6 surah-title text-center">
              {this.surahTitle()}
              <br />
              {this.surahName()}
            </div>
            <div className="col-md-3 col-xs-3 surah-title text-right">
              {this.nextChapter()}
              <img src="/images/ornament-right.png" className="ornament" />
            </div>
          </div>
          <DesktopOptions />
        </div>
      </nav>
    );
  }
}

MasterHeader.displayName = 'MasterHeader';

MasterHeader.contextTypes = {
  getStore: React.PropTypes.func.isRequired,
  executeAction: React.PropTypes.func.isRequired
};

MasterHeader = connectToStores(MasterHeader, [SurahsStore], (stores, props) => {
  return {
    surah: stores.SurahsStore.getSurah()
  }
});

// <DesktopOptions />
export default MasterHeader;
