import React from 'react';
import IndexHeader from 'components/IndexHeader';
import Helmet from 'react-helmet';

export default () => (
  <div>
    <Helmet title="About Quran.com" />
    <IndexHeader noSearch />
    <div className="about-text container-fluid">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h4 className="source-sans">
            The Noble Quran is the central
            religious text of Islam. Muslims believe the Qur’an is the
            book of Divine guidance and direction for mankind, and
            consider the original Arabic text the final revelation of
            Allah (God).[<a href="en.wikipedia.org/wiki/Quran">1</a>]
            All translations of the original Arabic text
            are thus interpretations of the original meanings and should
            be embraced as such. For more information about the Noble
            Quran, you may visit its <a href="https://en.wikipedia.org/wiki/Quran">Wikipedia article.</a>
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h3>MECCAN SURAHS</h3>
          <h4 className="source-sans">
            The Meccan suras are the chronologically earlier chapters
            (suras) of the Quran that were, according to Islamic
            tradition, revealed anytime before the migration of the
            Islamic prophet Muhammed and his followers from Mecca to
            Medina (Hijra). The Medinan suras are those revelations that
            occurred after the move to the city of that name.
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h3>MEDINAN SURAHS</h3>
          <h4 className="source-sans">
            The Medinan suras or Medinan chapters of the Quran are the
            latest 24 suras that, according to Islamic tradition, were
            revealed at Medina after Muhammad&apos;s hijra from Mecca. These
            suras were revealed by Allah when the Muslim community was
            larger and more developed, as opposed to their minority position
            in Mecca.
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h3>BROWSING SURAHS ON THIS WEBSITE</h3>
          <h4 className="source-sans">
            We have redesigned the website with a user friendly approach in
            mind. To browse through the surahs, click on the button
            (shown left) in the READ & LISTEN page and navigate surah by
            title or by page. In future iterations, we will be integrating
            more search and audio features inshaAllah. If you have any
            suggestions on how we can make the website a better experience
            please do not hesitate to <a href="https://quran.zendesk.com/hc/en-us">contact us</a>.
          </h4>
        </div>
      </div>
      <div className="row credits">
        <div className="col-md-8 col-md-offset-2">
          <h3><strong>CREDITS</strong></h3>
          <h4>
            This website was created by a few volunteers and was made
            possible with the will of Allah (Glory be unto Him) and with the
            help of the open source Muslim community online. Data sources
            include <a href="http://www.tanzil.info">Tanzil</a>,
            <a href="http://www.qurancomplex.com"> QuranComplex</a>,
            <a href="https://github.com/cpfair/quran-align">Colin Fair&apos;s work on audio segments</a>,
            <a href="http://www.zekr.org"> Zekr</a> and
            <a href="http://www.al-quran.info"> Online Quran Project</a>.
            Special thanks to the
            <a href="http://elmohafez.com"> Elmohafez team</a> for word by
            word timing files.
            If you have any questions, you may visit the <a href="/contact">Contact</a> page.
          </h4>
        </div>
      </div>
    </div>
  </div>
);
