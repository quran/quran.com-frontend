import React from 'react';
import SurahsStore from 'stores/SurahsStore';
import connectToStores from 'fluxible-addons-react/connectToStores';
import $ from 'jquery';

class SurahInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      page: null
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextProps.isExpanded) {
      return;
    }

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
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.currentSurah.id !== this.props.currentSurah.id) {
      return true;
    }

    if (nextProps.isExpanded !== this.props.isExpanded) {
      return true;
    }

    if (nextState.page && nextState.page.extract) {
      if (this.state.page && this.state.page.pageid === nextState.page.pageid) {
        return false;
      }

      return true;
    }

    return false;
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

  render() {
    if (this.props.isExpanded) {
      return this.renderInformation();
    }
    else {
      return <div />;
    }
  }
}

SurahInfo = connectToStores(SurahInfo, [SurahsStore], (context, props) => {
  const surahsStore = context.getStore(SurahsStore);

  return {
    isExpanded: surahsStore.getIsShowingInfo(),
    currentSurah: surahsStore.getSurah(),
    wikiLinks: surahsStore.getWikiLinks()
  };
});

export default SurahInfo;
