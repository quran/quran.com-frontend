import React, { Component, PropTypes } from 'react';
import Style from './style.scss';

export default class Share extends Component {
  static propTypes = {
    surah: PropTypes.object.isRequired
  };

  getId() {
    const { surahId } = this.props.surah;
    return surahId;
  }

  getName() {
    const { _, name } = this.props.surah;
    return name;
  }

  getNameSimple() {
    return this.getName().simple;
  }

  getUrl() {
    return encodeURIComponent(`https://quran.com/${this.getId()}`);
  }

  onClickPopup(url, title) {
    window.open(url, title, 'width=670,height=540,scrollbars=no,toolbar=0');
  }

  handleFacebook = () => {
    const baseUrl = `https://www.facebook.com/sharer/sharer.php?u=${this.getUrl()}`;
    this.onClickPopup(baseUrl, 'Facebook')
  }

  handleTwitter = () => {
    const baseUrl = `https://twitter.com/intent/tweet?url=${this.getUrl()}&text=Surat ${this.getNameSimple()}`;
    this.onClickPopup(baseUrl, 'Twitter');
  }

  render() {
    return (
      <div className={`${Style.share} hidden-xs`}>
        <a
          className={Style.shareLink}
          onClick={this.handleFacebook}
          data-metrics-event-name='Share:Facebook'
          title='Share on Facebook'
        >
          <i className={`fa fa-facebook ${Style.shareIcon}`} />
        </a>
        <a
          className={Style.shareLink}
          onClick={this.handleTwitter}
          data-metrics-event-name='Share:Twitter'
          title='Share on Twitter'
        >
          <i className={`fa fa-twitter ${Style.shareIcon}`} />
        </a>
      </div>
    );
  }
}
