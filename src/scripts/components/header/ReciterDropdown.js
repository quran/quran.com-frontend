/* eslint-disable handle-callback-err */

import React from 'react';
import request from 'superagent';
import Settings from 'constants/Settings';
import HeaderDropdown from './HeaderDropdown';
import * as AyahsActions from 'actions/AyahsActions';

class ReciterDropdown extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      options: []
    };
  }

  componentDidMount() {
    request.get(Settings.url + 'options/audio')
    .end(function(err, res) {
      this.setState({
          options: res.body
      });
    }.bind(this));
  }

  chosenOption(id, e) {
    e.preventDefault();

    this.context.executeAction(AyahsActions.updateAyahs, {
      audio: id
    });
  }

  renderMenu() {
    var selected = this.context.getStore('UserStore').getAudioOptions();

    return this.state.options.map((option) => {
      return (
        <li key={option.id}>
          <a eventKey={option.name.english}
             onClick={this.chosenOption.bind(this, option.id)}
             key={option.id}
             className={selected === option.id ? 'active' : ''}>
            {option.name.english}
          </a>
        </li>
      );
    });
  }

  render() {
    var className = 'reciter-dropdown ' + this.props.className;
    return (
      <HeaderDropdown linkContent="Reciter" linkIcon="ss-icon ss-highvolume" className={className}>
        {this.renderMenu()}
      </HeaderDropdown>
    );
  }
}

ReciterDropdown.contextTypes = {
  executeAction: React.PropTypes.func.isRequired,
  getStore: React.PropTypes.func.isRequired
};

export default ReciterDropdown;
