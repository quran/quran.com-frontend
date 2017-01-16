import React, { Component, PropTypes } from 'react';
import debug from 'helpers/debug';
import ContentDropdown from 'components/ContentDropdown';
import ReciterDropdown from 'components/ReciterDropdown';
import * as OptionsActions from 'redux/actions/options';

const style = require('../Surah/style.scss');

class Settings extends Component {

    handleOptionChange = (payload) => {
      OptionsActions.setOption(payload);
    }

    render() {
      debug('component:Settings', 'Render');
      const options = OptionsActions.getOptions();
      return (
        <div>
          <ReciterDropdown
            id="RecitersDropdown"
            onOptionChange={this.handleOptionChange}
            options={options}
            className={`${style.dropdown}`}
          />
          <ContentDropdown
            id="ContentDropdown"
            onOptionChange={this.handleOptionChange}
            options={options}
            className={`${style.dropdown}`}
          />
        </div>
      );
    }
}

export default Settings;
