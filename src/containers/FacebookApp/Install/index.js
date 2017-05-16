import React from 'react';
import Helmet from 'react-helmet';
import Button from 'react-bootstrap/lib/Button';

import makeHeadTags from 'helpers/makeHeadTags';

const styles = require('./style.scss');
const phones = require('../../../../static/images/mockup-desktop@2x.png');

export default () => (
  <div className={`${styles.container} montserrat container`}>
    <Helmet
      {...makeHeadTags({
        title: 'Live Quran Facebook app by Quran.com',
        description: 'From the makers of Quran.com comes Live Quran Facebook app. Install ad-free live Quran app to your facebook pages.' // eslint-disable-line max-len
      })}
    />

    <div className="row">
      <div className="col-md-5">
        <h1 className={styles.title}>
          <strong>LiveQuran</strong>{' '}Facebook App
          <br />
          by quran.com القرآن
        </h1>
        <h3>
          <small>
            From the makers of Quran.com comes Live Quran Facebook App. A beautiful,
            {' '}
            and ad-free Quran app with many translations, word by word audio and lot of good stuff.
            Install now on your page and let your fan read,
            memorize Quran and listen their favorite reciters.
            {' '}
            <a
              className={styles.fbColor}
              href="https://web.facebook.com/LiveQuranOfficial/app/342185219529773"
              rel="noopener noreferrer"
              target="_blank"
              data-metrics-event-name="Fb:ClickedDemo"
            >
              Click here for demo
            </a>
          </small>
        </h3>

        <div className="text-center">
          <Button
            className={styles.fbButton}
            href="https://web.facebook.com/dialog/pagetab?app_id=342185219529773&next=https://quran.com/fb/success"
            data-metrics-event-name="Fb:ClickedInstall"
          >
            Install Live Quran On Your Page
          </Button>
        </div>
      </div>
      <div className="col-md-7">
        <img src={phones} width="100%" alt="Apps" />
      </div>
    </div>
  </div>
);
