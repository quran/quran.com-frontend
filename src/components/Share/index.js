/* global window */
import React, { Component, PropTypes } from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';

const styles = require('./style.scss');

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

export default class Share extends Component {
  static propTypes = {
    surah: PropTypes.object.isRequired
  };

  onClickPopup = (url, title) => {
    window.open(url, title, 'width=670,height=540,scrollbars=no,toolbar=0');
  }

  render() {
    const { surahId, name } = this.props.surah;
    const surahUrl = `https://quran.com/${surahId}`;

    return (
      <div className={`${styles.shareContainer} hidden-xs`}>
        <FacebookShareButton
          url={surahUrl}
          title="Facebook"
          windowWidth={670}
          windowHeight={540}
          className={`${styles.iconContainer}`}
        >
          <FacebookIcon size={24} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={surahUrl}
          title={`Surat ${name.simple}`}
          className={`${styles.iconContainer}`}
        >
          <TwitterIcon size={24} round />
        </TwitterShareButton>
      </div>
    );
  }
}
