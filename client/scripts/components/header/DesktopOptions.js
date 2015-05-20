'use strict';

import React from 'react';
import SearchInput from 'components/header/SearchInput';
import ReciterDropdown from 'components/header/ReciterDropdown';
import ContentDropdown from 'components/header/ContentDropdown';
import Audioplayer from 'components/audioplayer/Audioplayer';
import FontSizeInput from 'components/header/FontSizeInput';
import ReadingModeToggle from 'components/header/ReadingModeToggle';

class DesktopOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row navbar-bottom hidden-xs">
        <SearchInput className="col-md-2 search-input" />

        <div className="options">
          <ReciterDropdown />
          <Audioplayer />
          <ContentDropdown />
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-5">
                <FontSizeInput />
              </div>
              <div className="col-md-5 text-center">
                <div className="row">
                  <div className="col-md-5">
                    <ReadingModeToggle />
                  </div>
                  <div className="col-md-5">
                    <a href className="nav-link">
                      <i className="fa fa-info-circle fa-2x pull-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DesktopOptions;
