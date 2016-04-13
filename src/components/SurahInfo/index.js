import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const style = require('./style.scss');

@connect(
  (state, ownProps) => {
    return {
      isShowingInfo: state.surahs.isShowingInfo,
      currentSurah: state.surahs.entities[state.surahs.current]
    };
  }
)
export default class SurahInfo extends Component {
  constructor() {
    super();

    this.state = {
      page: null
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const { currentSurah } = this.props;

    if (!nextProps.isShowingInfo) {
      return;
    }

    const surahInfo = require(`./htmls/${currentSurah.id}.html.js`);

    this.setState({
      page: surahInfo
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.currentSurah.id !== this.props.currentSurah.id) {
      return true;
    }

    if (nextProps.isShowingInfo !== this.props.isShowingInfo) {
      return true;
    }

    if (this.state.page !== nextState.page) {
      return true;
    }

    return false;
  }

  renderInformation() {
    var html = this.state.page;

    return (
      <div className={`col-md-12 ${style['surah-info']}`}>
        <div className={`${style.row}`}>
          <div className={`col-md-3 col-xs-6 ${style.bg}`} style={{background: `url(/images/${this.props.currentSurah.revelation.place}.jpg) center center no-repeat`}}>
          </div>
          <div className={`col-md-1 col-xs-6 ${style.list}`}>
            <dl>
              <dt>VERSES</dt>
              <dd className="text-uppercase">{this.props.currentSurah.ayat}</dd>
            </dl>
          </div>
          <div className={`col-md-8 ${style.info}`}>
            <div dangerouslySetInnerHTML={{__html: html}}></div>
            <div><p><em>Source: Sayyid Abul Ala Maududi - Tafhim al-Qur'an - The Meaning of the Qur'an</em></p></div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.isShowingInfo) {
      return this.renderInformation();
    }
    else {
      return <div />;
    }
  }
}
