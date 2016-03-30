import React, { Component, PropTypes } from 'react';
import { metrics } from 'react-metrics';
import Helmet from 'react-helmet';

import FontStyles from '../../components/FontStyles';

import debug from 'utils/Debug';
import config from '../../config';
import metricsConfig from '../../helpers/metrics';

@metrics(metricsConfig)
export default class Application extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;
    debug('component:APPLICATION', 'Render');

    return (
      <div>
        <Helmet {...config.app.head}/>
        <FontStyles />
        {children}
        <footer>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 col-md-offset-3 col-xs-4 col-xs-offset-1 about">
                <ul className="source-sans">
                  <li><a href="/about">About</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li>
                    <a href="https://github.com/quran/quran.com-frontend" target="_blank">Developers</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-2 col-xs-5 links">
                <ul className="source-sans">
                  <li><a target="_blank" href="http://sunnah.com/">Sunnah.com</a></li>
                  <li><a target="_blank" href="http://salah.com/">Salah.com</a></li>
                  <li><a target="_blank" href="http://quranicaudio.com/">QuranicAudio.com</a></li>
                  <li><a target="_blank" href="http://corpus.quran.com/wordbyword.jsp">Corpus: Word by Word</a></li>
                </ul>
              </div>
              <div className="col-md-2 text-right links">
                <ul className="list-inline">
                  <li><a><i className="fa fa-facebook"></i></a></li>
                  <li><a><i className="fa fa-twitter"></i></a></li>
                  <li><a><i className="fa fa-envelope"></i></a></li>
                </ul>
                <p className="monserrat">&copy; QURAN.COM. ALL RIGHTS RESERVED 2015</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
};
