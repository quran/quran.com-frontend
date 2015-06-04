'use strict';

import React from 'react';
import ReciterDropdown from 'components/header/ReciterDropdown';
import ContentDropdown from 'components/header/ContentDropdown';
import Audioplayer from 'components/audioplayer/Audioplayer';
import FontSizeInput from 'components/header/FontSizeInput';
import ReadingModeToggle from 'components/header/ReadingModeToggle';
import InformationToggle from 'components/header/InformationToggle';
import NavCollapseToggle from 'components/header/NavCollapseToggle';
import debug from 'utils/Debug';

class DesktopOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    debug('COMPONENT-DESKTOP OPTIONS');
    return (
      <div className="row navbar-bottom hidden-xs">
        <div className="options">
          <NavCollapseToggle />
          <ReciterDropdown />
          <Audioplayer />
          <ContentDropdown />
          <div className="col-md-3 height-100">
            <div className="row">
              <div className="col-md-6 height-100 border-right">
                <FontSizeInput />
              </div>
              <div className="col-md-3 text-center height-100">
                <ReadingModeToggle />
              </div>
              <div className="col-md-3 text-center height-100">
                <InformationToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DesktopOptions;
