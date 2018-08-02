import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import T, { KEYS } from './T';
import { FOOTER_EVENTS } from '../events';

const Container = styled.footer`
  background-color: ${({ theme }) => theme.colors.tuatara};
  padding: 3% 0 5% 0;
  font-size: 14px;
  margin-top: 50px;

  @media (max-width: ${({ theme }) => theme.screen.lg}) {
    padding-bottom: 7%;
  }

  @media (max-width: ${({ theme }) => theme.screen.sm}) {
    padding-bottom: 9%;
  }
`;

const Section = styled.div`
  padding-top: 30px;
  text-transform: uppercase;
`;

const Header = styled.p`
  line-height: 30px;
  color: ${({ theme }) => theme.colors.white};
`;

const List = styled.ul`
  padding-left: 0;

  li {
    list-style: none;
    padding: 5px 0;
  }
`;

const linkCss = css`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.15s ease-in-out;

  &:hover {
    color: #fff;
  }
`;

const StyledLink = styled.a`
  ${linkCss};
`;

const StyledRouterLink = styled(Link)`
  ${linkCss};
`;

const Footer = () => (
  <Container>
    <div className="container">
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <div className="row">
            <Section className="col-md-2 col-sm-4 col-xs-12">
              <Header>
                <T id={KEYS.NAV_NAVIGATE} />
              </Header>
              <List className="source-sans">
                <li>
                  <StyledRouterLink to="/about">
                    <T id={KEYS.NAV_ABOUTUS} />
                  </StyledRouterLink>
                </li>
                <li>
                  <StyledLink href="https://quran.zendesk.com/hc/en-us/requests/new">
                    <T id={KEYS.NAV_CONTACTUS} />
                  </StyledLink>
                </li>
                <li>
                  <StyledLink
                    href="https://quran.zendesk.com/hc/en-us/articles/210090626-Development-help"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...FOOTER_EVENTS.CLICK.DEVELOPERS_LINK.PROPS}
                  >
                    <T id={KEYS.NAV_DEVELOPERS} />
                  </StyledLink>
                </li>
              </List>
            </Section>
            <Section className="col-md-3 col-sm-4 col-xs-12">
              <Header>
                <T id={KEYS.NAV_USEFULSITES} />
              </Header>
              <List className="source-sans">
                <li>
                  <StyledLink
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://sunnah.com/"
                    {...FOOTER_EVENTS.CLICK.SUNNAH_LINK.PROPS}
                  >
                    Sunnah.com
                  </StyledLink>
                </li>
                <li>
                  <StyledLink
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://salah.com/"
                    {...FOOTER_EVENTS.CLICK.SALAH_LINK.PROPS}
                  >
                    Salah.com
                  </StyledLink>
                </li>
                <li>
                  <StyledLink
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://quranicaudio.com/"
                    {...FOOTER_EVENTS.CLICK.QURANICAUDIO_LINK.PROPS}
                  >
                    QuranicAudio.com
                  </StyledLink>
                </li>
                <li>
                  <StyledLink
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://corpus.quran.com/wordbyword.jsp"
                    {...FOOTER_EVENTS.CLICK.CORPUS_LINK.PROPS}
                  >
                    Corpus: Word by Word
                  </StyledLink>
                </li>
              </List>
            </Section>

            <Section className="col-md-3 col-sm-4 col-xs-12">
              <Header>
                <T id={KEYS.NAV_OTHERLINKS} />
              </Header>
              <List className="source-sans">
                <li>
                  <StyledLink
                    href="https://quran.com/sitemaps/sitemap.xml.gz"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...FOOTER_EVENTS.CLICK.SITEMAP_LINK.PROPS}
                  >
                    Sitemap
                  </StyledLink>
                </li>
                <li>
                  <StyledRouterLink
                    to="/36"
                    {...FOOTER_EVENTS.CLICK.CHAPTER_LINK.PROPS}
                    data-metrics-chapter-id="36"
                  >
                    Surah Yasin, Yaseen (يس)
                  </StyledRouterLink>
                </li>
                <li>
                  <StyledRouterLink
                    to="/ayatul-kursi"
                    {...FOOTER_EVENTS.CLICK.CHAPTER_LINK.PROPS}
                    data-metrics-chapter-id="2"
                    data-metrics-verse-id="255"
                  >
                    Ayat Al-Kursi (آية الكرسي)
                  </StyledRouterLink>
                </li>
              </List>
            </Section>
            <Section className="col-md-4 col-sm-12 col-xs-12">
              <p className="monserrat">
                <T id={KEYS.NAV_ABOUT_QURAN_PROJECT} />
                .
              </p>
              <p className="monserrat">
                © {new Date().getFullYear()} Quran.com.{' '}
                <T id={KEYS.NAV_RIGHTSRESERVED} />
                .
              </p>
            </Section>
          </div>
        </div>
      </div>
    </div>
  </Container>
);

export default Footer;
