import React from 'react';
import Link from 'react-router/lib/Link';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const styles = require('./style.scss');

const Footer = () => (
  <footer className={styles.footer}>
    <div className="container">
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <div className="row">
            <div className={`${styles.about} col-md-2 col-sm-4 col-xs-12`}>
              <p className={styles.header}>
                <LocaleFormattedMessage
                  id="nav.navigate"
                  defaultMessage="Navigate"
                />
              </p>
              <ul className={`source-sans ${styles.list}`}>
                <li>
                  <Link to="/about">
                    <LocaleFormattedMessage
                      id="nav.aboutUs"
                      defaultMessage="About Us"
                    />
                  </Link>
                </li>
                <li>
                  <a href="https://quran.zendesk.com/hc/en-us/requests/new">
                    <LocaleFormattedMessage
                      id="nav.contactUs"
                      defaultMessage="Contact Us"
                    />
                  </a>
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
            </div>
            <div className={`${styles.links} col-md-3 col-sm-4 col-xs-12`}>
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
            </div>

            <div className={`${styles.links} col-md-3 col-sm-4 col-xs-12`}>
              <p className={styles.header}>
                <LocaleFormattedMessage
                  id="nav.otherLinks"
                  defaultMessage="Other links"
                />
              </p>
              <ul className={`source-sans ${styles.list}`}>
                <li>
                  <a
                    href="https://quran.com/sitemaps/sitemap.xml.gz"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sitemap
                  </a>
                </li>
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
            </div>
            <div className={`${styles.links} col-md-4 col-sm-12 col-xs-12`}>
              <p className="monserrat">
                <LocaleFormattedMessage
                  id="nav.aboutQuranProject"
                  defaultMessage="QURAN.COM (ALSO KNOWN AS THE NOBLE QURAN, AL QURAN, HOLY QURAN, KORAN) IS A PRO BONO PROJECT."
                />
                .
              </p>
              <p className="monserrat">
                © {new Date().getFullYear()} Quran.com.{' '}
                <LocaleFormattedMessage
                  id="nav.rightsReserved"
                  defaultMessage="All Rights Reserved"
                />
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
