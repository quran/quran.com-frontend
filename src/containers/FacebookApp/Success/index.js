import React from 'react';
import Helmet from 'react-helmet';
import makeHeadTags from 'helpers/makeHeadTags';

const styles = require('./style.scss');

export default () => (
  <div className={`${styles.container} montserrat container`}>
    <Helmet
      {...makeHeadTags({
        title: 'Live Quran Facebook app by Quran.com',
        description: 'From the makers of Quran.com comes Live Quran Facebook app. Install ad-free live Quran app to your facebook pages.' // eslint-disable-line max-len
      })}
    />
    <div className="row">
      <div className="col-md-12">
        <h2 className={`${styles.title} text-center`}>
          <strong>Congratulation</strong>
          {' '}
          {' '}
          Live Quran is installed successfully on your page.
        </h2>
      </div>

      <div className="col-md-12">
        <div className="text-center">
          TODO: Explain how to configure tab etc
        </div>
      </div>
    </div>
  </div>
);
