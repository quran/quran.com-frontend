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

  renderInformation() {
    var extract = this.state.page ? this.state.page.extract : '';

    return (
      <div className="col-md-12 surah-info">
      <div className="row">
        <div className="col-md-3 col-xs-6 bg" style={{background: `url(/images/${this.props.currentSurah.revelation.place}.jpg) center center no-repeat`}}>
        </div>
        <div className="col-md-1 col-xs-6 list">
          <dl>
            <dt>CLASSIFICATION</dt>
            <dd className="text-capitalize">{this.props.currentSurah.revelation.place}</dd>
            <dt>ORDER</dt>
            <dd className="text-uppercase">{this.props.currentSurah.revelation.order}</dd>
            <dt>VERSES</dt>
            <dd className="text-uppercase">{this.props.currentSurah.ayat}</dd>
          </dl>
        </div>
        <div className="col-md-8 info" dangerouslySetInnerHTML={{__html: extract}}>
        </div>
      </div>
      </div>
    );
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
