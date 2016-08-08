import React, { Component, PropTypes } from 'react';
const Style = require('./style.scss');
export default class Share extends Component {


  static propTypes = {
    surah: PropTypes.object.isRequired
  };


  onClickPopup(url, title) {
    window.open(url, title, 'width=670,height=540,scrollbars=no,toolbar=0');
  }

  render() {

    const {surahId, name} = this.props.surah;
    const surahUrl = encodeURIComponent(`https://quran.com/${surahId}`);

    return (
      <div className={`${Style.shareContainer} hidden-xs`}>

        <i
          onClick={() => this.onClickPopup(`https://www.facebook.com/sharer/sharer.php?u=${surahUrl}`, 'Facebook')}
          className={`${Style.iconContainer} ${Style.facebook}`}
          data-metrics-event-name="Share:Facebook"
          title="Share on Facebook"
        >
        </i>

        <i
          onClick={() => this.onClickPopup(`https://twitter.com/intent/tweet?url=${surahUrl}&text=Surat ${name.simple}`, 'Twitter')}
          className={`${Style.iconContainer}  ${Style.twitter}`}
          data-metrics-event-name="Share:Twitter"
          title="Share on Twitter"
        >
        </i>

      </div>
    );
  }
}
