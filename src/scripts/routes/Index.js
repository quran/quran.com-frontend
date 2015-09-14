import React from 'react';
import IndexHeader from 'components/header/IndexHeader';
import {NavLink} from 'fluxible-router';
import {connectToStores, provideContext} from 'fluxible-addons-react';
import SurahsStore from 'stores/SurahsStore';
import UserStore from 'stores/UserStore';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  renderColumn(array) {
    return array.map((surah, i) => {
      return (
        <li className="row link" key={surah.id}>
          <NavLink href={'/' + surah.id}>
            <div className="col-xs-2 text-muted">
              {surah.id}
            </div>
            <div className="col-xs-7">
              {surah.name.simple}
              <br />
              <span className="english text-uppercase">{surah.name.english}</span>
            </div>
            <div className="col-xs-3 text-right arabic">
              {surah.name.arabic}
            </div>
          </NavLink>
        </li>
      );
    });
  }

  renderLastVisit() {
    if (this.props.lastVisit) {
      let surah = this.props.surahs[this.props.lastVisit.surah - 1];

      if (!surah) {
        return;
      }

      return (
        <div className="col-md-10 col-md-offset-1">
          <div className="row last-visit">
            <div className="col-md-4">
              <h4 className="text-muted text-center title">LAST VISITED:</h4>
            </div>
            <ul className="col-md-4">
              <li className="row link">
                <NavLink href={`/${this.props.lastVisit.surah}/${this.props.lastVisit.ayah}`}>
                  <div className="col-xs-2 text-muted">
                    {surah.id}:{this.props.lastVisit.ayah}
                  </div>
                  <div className="col-xs-7">
                    {surah.name.simple}
                    <br />
                    <span className="english text-uppercase">
                      {surah.name.english}
                    </span>
                  </div>
                  <div className="col-xs-3 text-right arabic">
                    {surah.name.arabic}
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    return null;
  }

  renderFirstTimeContent() {
    if (this.props.isFirstTime) {
      return (
        <div className="col-md-10 col-md-offset-1">
          <h4 style={{fontWeight: 300, lineHeight: '125%', paddingTop: '25px'}}>
            Asalamu Alykom, welcome to the new Quran.com.
            <br /><br />
            Much has changed in the past few years in technology and we felt
            that we need to catch up. After over a year of hard work we are excited
            to present to you the new Quran.com.
            <br /><br />
            Firstly, it includes a fresh
            new look - our religion is beautiful and we believe that everything
            we create for Muslims should be beautiful too. Secondly, we have put
            great effort to providing you with more content, a better search,
            more reciters, word-by-word audio and an overall cleaner interface.
            <br /><br />
            If you wish to go back to the old site, feel free to click on the link
            on the top nav or visit <a href="http://legacy.quran.com">legacy.quran.com</a>.
            Also, feel free to <NavLink href="/contact">contact us</NavLink> and let us know about bugs, feature requests,
            improvements or help out with development.
            <br /><br />
            We hope you enjoy the new Quran.com as much as we do. We are all in this together
            and want to improve the product to serve you better. Please feel free
            to share it amongst family and friends, and let us know how we can
            serve you better.
            <br/><br/>
            - Quran.com team
          </h4>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
        <div className="index-page">
          <IndexHeader />
          <div className="container surah-list">
            <div className="row">
              {this.renderFirstTimeContent()}
              {this.renderLastVisit()}
              <div className="col-md-10 col-md-offset-1">
                <h4 className="text-muted text-center title">SURAHS (CHAPTERS)</h4>
                <div className="row">
                  <ul className="col-md-4">
                    {this.renderColumn(this.props.surahs.slice(0, 38))}
                  </ul>
                  <ul className="col-md-4">
                    {this.renderColumn(this.props.surahs.slice(38, 76))}
                  </ul>
                  <ul className="col-md-4">
                    {this.renderColumn(this.props.surahs.slice(76, 114))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

Index = connectToStores(Index, [SurahsStore, UserStore], (context, props) => {
  const surahsStore = context.getStore(SurahsStore);
  const userStore = context.getStore(UserStore);

  return {
    surahs: surahsStore.getSurahs(),
    lastVisit: userStore.getLastVisit(),
    isFirstTime: userStore.getIsFirstTime()
  };
});

export default Index;
