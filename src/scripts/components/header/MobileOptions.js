'use strict';

import React from 'react';
import SearchInput from './SearchInput';
import ReciterDropdown from './ReciterDropdown';
import ContentDropdown from './ContentDropdown';
import Audioplayer from '../audioplayer/Audioplayer';
import SurahsNav from 'components/surah/SurahsNav';
import FontSizeInput from './FontSizeInput';
import ReadingModeToggle from './ReadingModeToggle';

class MobileOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      readingMode: false,
      infoMode: false,
      chapterSelection: false,
      searchSelection: false,
      contentSelection: false,
      audioSelection: false,
      settingsSelection: false
    };
  }

  _readingMode() {
      this.setState({
          readingMode: !this.state.readingMode
      });

      AyatActions.triggerReading();
  }

  _setSelection(e, prop) {
      e.preventDefault();

      var defaultState = {
          infoMode: false,
          chapterSelection: false,
          searchSelection: false,
          contentSelection: false,
          audioSelection: false,
          settingsSelection: false
      };

      defaultState[prop] = !this.state[prop];

      this.setState(defaultState);
  }

  _chapterSelection(e) {
      this._setSelection(e, 'chapterSelection');
  }

  _searchSelection(e) {
      this._setSelection(e, 'searchSelection');
  }

  _audioSelection(e) {
      this._setSelection(e, 'audioSelection');
  }

  _contentSelection(e) {
      this._setSelection(e, 'contentSelection');
  }

  _settingsSelection(e) {
      this._setSelection(e, 'settingsSelection');
  }

  _renderSelection() {
      if (this.state.chapterSelection) {
          return (
              <div className="row">
                  <SurahsNav />
              </div>
          );
      } else if (this.state.searchSelection) {
          return (
              <div className="row">
                  <SearchInput className="col-md-2 col-xs-10" />
              </div>
          );
      }
  }

  _renderBottomSelection() {
      var selection;
      if (this.state.audioSelection) {
          selection = (
              <div className="row text-center">
                  <Audioplayer />
                  <ReciterDropdown />
              </div>
          );
      } else if (this.state.settingsSelection) {
          selection = (
              <div className="row options">
                  <div className="col-xs-8 full-height">
                      <FontSizeInput />
                  </div>
                  <div className="col-xs-2 full-height">
                      <ReadingModeToggle noPullRight={true} />
                  </div>
              </div>
          );

      } else if (this.state.contentSelection) {
          selection = (
              <div className="row text-center">
                  <ContentDropdown />;
              </div>
          );
      }

      return selection;
  }

  render() {
      return (
          <div className="mobile navbar-bottom visible-xs col-xs-10">
              <div className="row dark-bg">
                  <div className="toggle-options col-xs-8">
                    <a onClick={this._chapterSelection}>
                      Chapter / Surah&nbsp;<i className="ss-icon ss-directup" />
                    </a>
                  </div>
                  <div className="toggle-options col-xs-2">
                    <a onClick={this._searchSelection}>
                      <i className="ss-icon ss-search"></i>
                    </a>
                  </div>
              </div>
              {this._renderSelection()}
              <div className="row options text-center">
                <ul className="col-xs-10">
                  <li>
                    <a className="nav-link">
                      <i className="ss-icon ss-info" />
                    </a>
                  </li>
                  <li>
                    <a onClick={this._audioSelection}>
                      <i className="ss-icon ss-play" />
                      <i className="ss-icon ss-pause" />
                    </a>
                  </li>
                  <li>
                    <a onClick={this._contentSelection}>
                      <i className="ss-icon ss-globe" />
                    </a>
                  </li>
                  <li>
                    <a onClick={this._settingsSelection}>
                      <i className="ss-icon ss-settings" />
                    </a>
                  </li>
                </ul>
              </div>
              {this._renderBottomSelection()}
          </div>
      );
  }
}

MobileOptions.displayName = 'MobileOptions';


export default MobileOptions;


//
//                     <div className="col-md-2">
//                         <div className="row">
//                             <div className="col-md-5 text-center">
//                                 <a className="nav-link" onClick={this._readingMode}>
//                                   <i className="fa fa-newspaper-o fa-2x pull-right"></i>
//                                 </a>
//                             </div>
//                             <div className="col-md-5 text-left">
//                                 <a className="nav-link">
//                                     <i className="fa fa-info-circle fa-2x pull-right"></i>
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                   </div>
//                 </div>
