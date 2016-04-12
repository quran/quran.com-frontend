import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const style = require('./style.scss');

export default class InformationToggle extends Component {
  constructor(props) {
    super();

    this.state = {
      toggled: false
    };
  }

  toggleInformationMode(e) {
    e.preventDefault();

    this.setState({
      toggled: !this.state.toggled
    });

    //this.context.executeAction(SurahsActions.showInfo);
  }

  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: 'col-md-3'
  }

  render() {
    const { className } = this.props;
    var classes = classNames({
      active: this.state.toggled,
      'nav-link': true,
      'toggle-icon': true
    });

    return (
      <div className={`${className}`}>
        <a title="See information for this surah"
        className={classes} onClick={this.toggleInformationMode.bind(this)}>
          <i className="ss-icon ss-info" />
        </a>
      </div>
    );
  }
}
