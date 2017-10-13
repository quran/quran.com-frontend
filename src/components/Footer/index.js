import React from 'react';
import Link from 'react-router/lib/Link';
import styled from 'styled-components';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const Container = styled.footer`
  background-color: ${props => props.theme.colors.tuatara};
  padding: 3% 0 5% 0;
  font-size: 14px;
  margin-top: 50px;

  @media (max-width: ${props => props.theme.screen.lg}) {
    padding-bottom: 7%;
  }

  @media (max-width: ${props => props.theme.screen.sm}) {
    padding-bottom: 9%;
  }

  a {
    -webkit-transition: color .15s ease-in-out;
    -moz-transition: color .15s ease-in-out;
    -o-transition: color .15s ease-in-out;
    -ms-transition: color .15s ease-in-out;
    transition: color .15s ease-in-out;
  }
`;

const Section = styled.div`
  padding-top: 30px;
  text-transform: uppercase;

  a {
    font-size: 13px;
    color: rgba(#fff, 0.5);

    &:hover {
      color: #fff;
    }
  }
`;

const Header = styled.p`
  line-height: 30px;
  color: ${props => props.theme.colors.white};
`;

const List = styled.ul`
  padding-left: 0;

  li {
    list-style: none;
    padding: 5px 0;
  }
`;

const Footer = () =>
  <Container>
    <div className="container">
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <div className="row">
            <Section className="col-md-2 col-sm-4 col-xs-12">
              <Header>
                <LocaleFormattedMessage
                  id="nav.navigate"
                  defaultMessage="Navigate"
                />
              </Header>
              <List className="source-sans">
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
              </List>
            </Section>
            <Section className="col-md-3 col-sm-4 col-xs-12">
              <Header>
                <LocaleFormattedMessage
                  id="nav.usefulSites"
                  defaultMessage="USEFUL SITES"
                />
              </Header>
              <List className="source-sans">
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
              </List>
            </Section>

            <Section className="col-md-3 col-sm-4 col-xs-12">
              <Header>
                <LocaleFormattedMessage
                  id="nav.otherLinks"
                  defaultMessage="Other links"
                />
              </Header>
              <List className="source-sans">
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
              </List>
            </Section>
            <Section className="col-md-4 col-sm-12 col-xs-12">
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
            </Section>
          </div>
        </div>
      </div>
    </div>
  </Container>;

export default Footer;
