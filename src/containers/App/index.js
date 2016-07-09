/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import { metrics } from 'react-metrics';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import Helmet from 'react-helmet';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import debug from '../../helpers/debug';
import config from '../../config';
import metricsConfig from '../../helpers/metrics';

import FontStyles from 'components/FontStyles';

const styles = require('./style.scss');

@metrics(metricsConfig)
@connect(
  state => ({
    surahs: state.surahs.entities
  })
)
export default class App extends Component {
  static propTypes = {
    surahs: PropTypes.object,
    children: PropTypes.any
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;
    debug('component:APPLICATION', 'Render');

    return (
      <div>
        <Helmet {...config.app.head} />
        <FontStyles />
        {children}
        <footer className={styles.footer}>
          <Grid fluid>
            <Row>
              <Col md={2} mdOffset={3} xs={4} xsOffset={1} className={styles.about}>
                <ul className={`source-sans ${styles.list}`}>
                  <li><a href="/about">About</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li>
                    <a href="https://github.com/quran/quran.com-frontend" target="_blank">
                      Developers
                    </a>
                  </li>
                </ul>
              </Col>
              <Col md={2} xs={5} className={styles.links}>
                <ul className={`source-sans ${styles.list}`}>
                  <li><a target="_blank" href="http://sunnah.com/">Sunnah.com</a></li>
                  <li><a target="_blank" href="http://salah.com/">Salah.com</a></li>
                  <li><a target="_blank" href="http://quranicaudio.com/">QuranicAudio.com</a></li>
                  <li>
                    <a target="_blank" href="http://corpus.quran.com/wordbyword.jsp">
                      Corpus: Word by Word
                    </a>
                  </li>
                </ul>
              </Col>
              <Col md={2} className={`text-right ${styles.links}`}>
                <p className="monserrat">&copy; QURAN.COM. ALL RIGHTS RESERVED 2016</p>
                <p className="monserrat">
                  Quran.com (also known as The Noble Quran, Al Quran, Holy Quran, Koran){' '}
                  is a pro bono project.
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={10} mdOffset={1} className="text-center">
                <ul className={`list-inline ${styles.seo}`}>
                  <li><a href="/sitemap.xml">Sitemap</a></li>
                  <li>
                    <Link
                      to="/36"
                      data-metrics-event-name="FooterLinks:Click"
                      data-metrics-surah-id="36"
                    >
                      Surah Yasin, Yaseen (يس)
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/2/255"
                      data-metrics-event-name="FooterLinks:Click"
                      data-metrics-surah-id="2/255"
                    >
                      Ayat Al-Kursi (آية الكرسي)
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Grid>
        </footer>
      </div>
    );
  }
}
