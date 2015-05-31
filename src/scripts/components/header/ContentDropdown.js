import React from 'react';
import request from 'superagent';
import Settings from 'constants/Settings';
import HeaderDropdown from './HeaderDropdown';
import UserOptionsStore from 'stores/UserOptionsStore';
import * as AyahsActions from 'actions/AyahsActions';

class ContentDropdown extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      options: [],
      chosenOptions: this.context.getStore(UserOptionsStore).getContentOptions()
    }
  }

  componentDidMount() {
    request.get(Settings.url + 'options/content')
    .end((err, res) => {
        this.setState({
            options: res.body
        });
    }.bind(this));
  }

  chosenOption(id, e) {
    let chosenOptions = this.state.chosenOptions;

    if (chosenOptions.find(x => x === id)) {
      chosenOptions.splice(
        chosenOptions.findIndex(x => x === id),
        1
      );

      this.setState({
        chosenOptions: chosenOptions
      });
    } else {
      chosenOptions = chosenOptions.concat([id]);

      this.setState({
        chosenOptions: chosenOptions
      });
    }

    this.context.executeAction(AyahsActions.updateAyahs, {
      content: chosenOptions
    });
  }

  returnList(option) {
    var checked = this.state.chosenOptions.find(x => x === option.id);

    return (
      <li key={option.id}>
        <input
          type="checkbox"
          id={option.id + option.language}
          onChange={this.chosenOption.bind(this, option.id)}
          checked={checked} />
        <label htmlFor={option.id + option.language}
               className="content-checkbox">
          {option.name}
        </label>
      </li>
    );
  }

  renderContent(type) {
    var condition;
    return this.state.options.map((option) => {
      if (type === 'en') {
        condition = option.language === 'en' && option.type === 'translation';
      } else if (type === '!en') {
        condition = option.language !== 'en' && option.type === 'translation';
      }
      if (condition) {
        return this.returnList(option);
      }
    });
  }

  render() {
    var className = 'content-dropdown ' + this.props.className;
    return (
      <HeaderDropdown linkContent='Translations' linkIcon='ss-icon ss-globe' className={className}>
        <li role="presentation" className="dropdown-header">English</li>
        {this.renderContent('en')}
        <li role="presentation" className="dropdown-header languages">Other Languages</li>
        {this.renderContent('!en')}

      </HeaderDropdown>
    );
  }
}

ContentDropdown.contextTypes = {
  getStore: React.PropTypes.func.isRequired,
  executeAction: React.PropTypes.func.isRequired
};

ContentDropdown.displayName = 'ContentDropdown';

export default ContentDropdown;
