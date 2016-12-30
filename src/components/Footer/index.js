import React from 'react';
import Link from 'react-router/lib/Link';

import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import LocaleSwitcher from 'components/LocaleSwitcher';

const styles = require('./style.scss');

const Footer = () => (
  <footer className={styles.footer}>
    <Grid>
      <Col md={10} mdOffset={1}>
        <div className="row">
          <Col md={2} sm={4} xs={12} className={styles.about}>
            <p className={styles.header}>Navigate</p>
            <ul className={`source-sans ${styles.list}`}>
              <li>
                <Link to="/about">
                  <LocaleFormattedMessage
                    id={'nav.aboutUs'}
                    defaultMessage={'About Us'}
                  />
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <LocaleFormattedMessage
                    id={'nav.contactUs'}
                    defaultMessage={'Contact Us'}
                  />
                </Link>
              </li>
              <li>
                <a
                  href="https://quran.zendesk.com/hc/en-us/articles/210090626-Development-help"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-metrics-event-name="Footer:Link:Developer"
                >
                  <LocaleFormattedMessage
                    id="nav.developers"
                    defaultMessage="Developers"
                  />
                </a>
              </li>
            </ul>
          </Col>

          <Col md={3} sm={4} xs={12} className={styles.links}>
            <p className={styles.header}>
              <LocaleFormattedMessage
                id="nav.usefulSites"
                defaultMessage="USEFUL SITES"
              />
            </p>
            <ul className={`source-sans ${styles.list}`}>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://sunnah.com/"
                  data-metrics-event-name="Footer:Link:Sunnah"
                >
                  Sunnah.com
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://salah.com/"
                  data-metrics-event-name="Footer:Link:Salah"
                >
                  Salah.com
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://quranicaudio.com/"
                  data-metrics-event-name="Footer:Link:QuranicAudio"
                >
                  QuranicAudio.com
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://corpus.quran.com/wordbyword.jsp"
                  data-metrics-event-name="Footer:Link:Corpus"
                >
                  Corpus: Word by Word
                </a>
              </li>
            </ul>
          </Col>

          <Col md={3} sm={4} xs={12} className={styles.links}>
            <p className={styles.header}>
              <LocaleFormattedMessage
                id="nav.otherLinks"
                defaultMessage="Other links"
              />
            </p>
            <ul className={`source-sans ${styles.list}`}>
              <li><a href="/sitemap.xml">Sitemap</a></li>
              <li>
                <Link
                  to="/36"
                  data-metrics-event-name="Footer:Link:Click"
                  data-metrics-surah-id="36"
                >
                  Surah Yasin, Yaseen (يس)
                </Link>
              </li>
              <li>
                <Link
                  to="/2/255"
                  data-metrics-event-name="Footer:Link:Click"
                  data-metrics-surah-id="2/255"
                >
                  Ayat Al-Kursi (آية الكرسي)
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={4} sm={12} xs={12} className={styles.links}>
            <p className={styles.header}>
              <LocaleFormattedMessage
                id="local.selectLabel"
                defaultMessage="Site Language"
              />
            </p>

            <div className={styles.list}>
              <LocaleSwitcher />
              <p className="monserrat">
                <LocaleFormattedMessage
                  id="nav.aboutQuranProject"
                  defaultMessage="Quran.com (also known as The Noble Quran, Al Quran, Holy Quran, Koran) is a pro bono project."
                />
              </p>

              <p className="monserrat">&copy; QURAN.COM. ALL RIGHTS RESERVED 2016</p>
            </div>
          </Col>
        </div>
      </Col>
    </Grid>
  </footer>
);

export default Footer;
