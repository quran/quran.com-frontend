import React from 'react';

import FacebookTokenButton from 'components/FacebookTokenButton';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const logo = require('../../../static/images/logo-lg.png');

export default () =>
  <div className="row" style={{ paddingTop: '10vh' }}>
    <div className="col-md-4 col-md-offset-4">
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="text-center">
            <img src={logo} alt="logo" width="30%" />
            <h3 style={{ color: '#000' }}>Quran.com</h3>
          </div>
          <p>
            <LocaleFormattedMessage
              id="login.message"
              default="Sign in to Quran.com to store all your bookmarks, notes and activities."
            />
          </p>
          <FacebookTokenButton />
        </div>
      </div>
    </div>
  </div>;
