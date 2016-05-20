'use strict';

import React from 'react';
import FontSizeInput from 'components/header/FontSizeInput';
import ReadingModeToggle from 'components/header/ReadingModeToggle';
import InformationToggle from 'components/header/InformationToggle'; // TODO: re-include with a non-wiki source
import NavCollapseToggle from 'components/header/NavCollapseToggle';
import debug from '../../helpers/debug';

class DesktopOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    debug('component:DESKTOP OPTIONS', 'Render');
    return (
      <div className="row navbar-bottom hidden-xs hidden-sm">
        <div className="options">
          <NavCollapseToggle />
          <ReciterDropdown />
          <ContentDropdown />
          <div className="col-md-3 height-100">
            <div className="row">
              <div className="col-md-9 height-100 border-right">
                <FontSizeInput />
              </div>
              <div className="col-md-3 text-center height-100">
                <ReadingModeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DesktopOptions;
