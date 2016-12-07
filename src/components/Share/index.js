import React, { Component, PropTypes } from 'react';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share';

const Style = require('./style.scss');

const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

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

        <FacebookShareButton
          url={surahUrl}
          title="Facebook"
          windowWidth={670}
          windowHeight={540}
          className={`${Style.iconContainer} ${Style.facebook}`}
        >
        </FacebookShareButton>

        <TwitterShareButton
          url={`${surahUrl}`}
          title={`Surat ${name.simple} ${decodeURIComponent(surahUrl)}`}
          className={`${Style.iconContainer}  ${Style.twitter}`}>
        </TwitterShareButton>

      </div>
    );
  }
}
