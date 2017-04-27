import React from 'react';
import Helmet from 'react-helmet';
import Button from 'react-bootstrap/lib/Button';

import makeHeadTags from 'helpers/makeHeadTags';

const styles = require('./style.scss');
const apple = require('../../../static/images/apple-white.svg');
const play = require('../../../static/images/play-store.svg');
const phones = require('../../../static/images/mockup-desktop@2x.png');

export default () => (
  <div className={`${styles.container} montserrat container`}>
    <Helmet
      {
        ...makeHeadTags({
          title: 'Quran Android and iOS apps by Quran.com',
          description: 'From the makers of Quran.com comes Quran for iOS and Android, a beautiful, and ad-free mushaf apps' // eslint-disable-line max-len
        })
      }
    />
    <div className="row">
      <div className="col-md-5">
        <h1 className={styles.title}>
          <strong>Quran</strong><br />
          by quran.com القرآن
        </h1>
        <h3>
          <small>
            From the makers of Quran.com comes Quran for iOS, a beautiful,{' '}
            and ad-free mushaf app.
            It’s now easier to read the Quran on the go, memorize it and listen to your{' '}
            favorite reciters.
          </small>
        </h3>
        <div className="row" style={{ paddingTop: 15 }}>
          <div className="col-md-6">
            <Button
              bsStyle="primary"
              bsSize="lg"
              href="https://itunes.apple.com/us/app/quran-by-quran.com-qran/id1118663303?mt=8"
              className={styles.button}
              block
            >
              <img
                src={apple}
                alt="App Store"
                height="28px"
                style={{ paddingRight: 10, marginTop: -6 }}
              />
              Download
            </Button>
          </div>
          <div className="col-md-6">
            <Button
              bsSize="lg"
              className={styles.button}
              href="https://play.google.com/store/apps/details?id=com.quran.labs.androidquran&hl=en"
              block
            >
              <img src={play} alt="Play Store" height="24px" style={{ paddingRight: 10 }} />
              Download
            </Button>
          </div>
        </div>
      </div>
      <div className="col-md-7">
        <img src={phones} width="100%" alt="Apps" />
      </div>
    </div>
  </div>
);
