import React from 'react';
import Helmet from 'react-helmet';
import IndexHeader from 'components/IndexHeader';
import AboutText from 'components/AboutText';

export default () => (
  <div>
    <Helmet title="About Quran.com" />
    <IndexHeader noSearch />
    <AboutText className="container-fluid">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h4 className="source-sans">
            The Noble Qur’an is the central religious text of <a href="https://en.wikipedia.org/wiki/Islam">Islam</a>.
            Muslims  believe the Qur’an is the book of divine guidance and direction for
            mankind, and consider the original Arabic text the final revelation
            of Allah (God). All translations of the original Arabic text are thus interpretations of
            the original meanings and should be embraced as such. For more
            information about the Noble Qur’an, you may visit its{' '}
            <a href="https://en.wikipedia.org/wiki/Quran">Wikipedia article.</a>
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h3>MECCAN <i>SURAHS</i></h3>
          <h4 className="source-sans">
            The <a href="https://en.wikipedia.org/wiki/Meccan_surah">Meccan <i>surahs</i></a>
            are the chronologically earlier chapters (<i>surahs<i/>)
            of the Qur’an that were, according to Islamic tradition, revealed
            anytime before the migration of the Islamic Prophet <a href="https://en.wikipedia.org/wiki/Muhammad">Muhammad</a> and his
            followers from the city of <a href="https://en.wikipedia.org/wiki/Mecca">Mecca</a> to <a href="https://en.wikipedia.org/wiki/Medina">Medina</a> (<i><a href="https://en.wikipedia.org/wiki/Hegira">Hijrah</a></i>).
            The <a href="https://en.wikipedia.org/wiki/Medinan_surah">Medinan <i>surahs</i></a> are those revelations that occurred after the migration to Medina.
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h3>MEDINAN SURAHS</h3>
          <h4 className="source-sans">
            The Medinan <i>surahs</i> or Medinan chapters of the Qur’an are the latest
            24 Surahs that, according to Islamic tradition, were revealed to Muhammad in Medina, after his <i>Hijrah</i>
            from Mecca. These <i>Surahs</i>. This is when the Muslim community was larger and more developed, in contrast to their minority position in Mecca.
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h3>BROWSING SURAHS ON THIS WEBSITE</h3>
          <h4 className="source-sans">
            We have designed the website with a user-friendly approach in
            mind. To browse through the <i>surahs</i>, start by selecting a chapter on the <a href="https://quran.com/">home page</a>.   
            In future iterations, we will be integrating more search and audio
            features, ان شاء الله. If you have any suggestions on how we can
            improve the website please do not hesitate to{' '}
            <a href="https://quran.zendesk.com/hc/en-us">contact us</a>
            .
          </h4>
        </div>
      </div>
      <div className="row credits">
        <div className="col-md-8 col-md-offset-2">
          <h3>
            <strong>CREDITS</strong>
          </h3>
          <h4>
            This website was created by a few volunteers and was made possible
            with the will of Allah (Glory be unto Him) and with the help of the
            open source Muslim community online. Data sources include{' '}
            <a href="http://www.tanzil.info">Tanzil</a>,
            <a href="http://www.qurancomplex.com"> Qur‘anComplex</a>,
            <a href="https://github.com/cpfair/quran-align"> Colin Fair's work on audio segments</a>
            ,
            <a href="http://www.zekr.org"> Zekr</a> and the
            <a href="http://al-quran.info"> Online Qur’an Project</a>.
            Special thanks to the
            <a href="http://elmohafez.com"> Elmohafez team</a> for word by word
            timing files. If you have any questions, you may visit the{' '}
            <a href="/contact">Contact</a> page.
          </h4>
        </div>
      </div>
    </AboutText>
  </div>
);
