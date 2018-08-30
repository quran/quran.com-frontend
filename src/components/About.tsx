import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Padding } from 'styled-components-spacing';

import Jumbotron from './Jumbotron';
import Text from './dls/Text';
import Title from './dls/Title';

export const AboutText = styled.div``;

// TODO: Translations
const About: React.SFC = () => (
  <div>
    <Helmet title="About Quran.com" />
    <Jumbotron noSearch />
    <Padding vertical={3}>
      <div className="container-fluid">
        <Padding vertical={3}>
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <Text>
                The Noble Qur’an is the central religious text of Islam. Muslims
                believe the Qur’an is the book of Divine guidance and direction
                for mankind, and consider the original Arabic text the final
                revelation of Allah (God).[<a href="en.wikipedia.org/wiki/Quran">
                  1
                </a>] All translations of the original Arabic text are thus
                interpretations of the original meanings and should be embraced
                as such. For more information about the Noble Qur’an, you may
                visit its{' '}
                <a href="https://en.wikipedia.org/wiki/Quran">
                  Wikipedia article.
                </a>
              </Text>
            </div>
          </div>
        </Padding>
        <Padding vertical={3}>
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <Title level={4} brand="primary">
                MECCAN SURAHS
              </Title>
              <Text>
                The Meccan Surahs are the chronologically earlier chapters
                (Surahs) of the Qur’an that were, according to Islamic
                tradition, revealed anytime before the migration of the Islamic
                prophet Muhammed and his followers from Mecca to Medina (Hijra).
                The Medinan Surahs are those revelations that occurred after the
                move to the city of that name.
              </Text>
            </div>
          </div>
        </Padding>
        <Padding vertical={3}>
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <Title level={4} brand="primary">
                MEDINAN SURAHS
              </Title>
              <Text>
                The Medinan Surahs or Medinan Chapters of the Qur’an are the
                latest 24 Surahs that, according to Islamic tradition, were
                revealed at Medina after Muhammad’s Hijra from Mecca. These
                Surahs were revealed by Allah when the Muslim community was
                larger and more developed, as opposed to their minority position
                in Mecca.
              </Text>
            </div>
          </div>
        </Padding>
        <Padding vertical={3}>
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <Title level={4} brand="primary">
                BROWSING SURAHS ON THIS WEBSITE
              </Title>
              <Text>
                We have redesigned the website with a user friendly approach in
                mind. To browse through the Surahs, click on the button (shown
                left) in the READ & LISTEN page and navigate Surah by title or
                by page. In future iterations, we will be integrating more
                search and audio features, ان شاء الله. If you have any
                suggestions on how we can make the website a better experience
                please do not hesitate to{' '}
                <a href="https://quran.zendesk.com/hc/en-us">contact us</a>
                .
              </Text>
            </div>
          </div>
        </Padding>
        <Padding vertical={3}>
          <div className="row credits">
            <div className="col-md-8 col-md-offset-2">
              <Title level={4} brand="primary">
                CREDITS
              </Title>
              <Text>
                This website was created by a few volunteers and was made
                possible with the will of Allah (Glory be unto Him) and with the
                help of the open source Muslim community online. Data sources
                include <a href="http://www.tanzil.info">Tanzil</a>,
                <a href="http://www.qurancomplex.com"> Qur‘anComplex</a>,
                <a href="https://github.com/cpfair/quran-align">
                  {' '}
                  Colin Fair’s work on audio segments
                </a>
                ,
                <a href="http://www.zekr.org"> Zekr</a> and
                <a href="http://www.al-quran.info"> Online Qur’an Project</a>.
                Special thanks to the
                <a href="http://elmohafez.com"> Elmohafez team</a> for word by
                word timing files. If you have any questions, you may visit the{' '}
                <a href="/contact">Contact</a> page.
              </Text>
            </div>
          </div>
        </Padding>
      </div>
    </Padding>
  </div>
);

export default About;
