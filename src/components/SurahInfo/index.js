import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const style = require('./style.scss');

@connect(
  (state, ownProps) => {
    return {
      isShowingInfo: state.surahs.isShowingInfo,
      currentSurah: state.surahs.entities[state.surahs.current]
    };
  },
  {
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
    console.log('nextProps', nextProps);
    const { currentSurah } = this.props;
    if (!nextProps.isShowingInfo) {
      return;
    }

    /*
    var self = this;
    let link = this.props.wikiLinks[nextProps.currentSurah.id];

    $.ajax( {
      url: `http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=${link}&redirects=true`,
      dataType: 'jsonp',
      type: 'get',
      headers: {'Api-User-Agent': 'Example/1.0', 'Identify-Me': 'quran.com, mmahalwy@gmail.com'}
    }).then(function(r) {
      var page = Object.keys(r.query.pages)[0];

      self.setState({
        page: r.query.pages[page]
      });

      return;
    });
    */
    const surahInfo = require(`./htmls/${currentSurah.id}.html.js`);
    this.setState({
      page: surahInfo
    });
    console.log('this used to fetch wikipedia', { surahInfo });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('should component update', nextProps);
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
        <div className="col-md-8 info" dangerouslySetInnerHTML={{__html: html}}>
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
