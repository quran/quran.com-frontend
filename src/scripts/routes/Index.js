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

      const lastVisitedAyah = parseInt(this.props.lastVisit.ayah);

      return (
        <div className="col-md-10 col-md-offset-1">
          <div className="row last-visit">
            <div className="col-md-4">
              <h4 className="text-muted text-center title">LAST VISITED:</h4>
            </div>
            <ul className="col-md-4">
              <li className="row link">
                <NavLink href={`/${this.props.lastVisit.surah}/${lastVisitedAyah}-${lastVisitedAyah + 10}`}>
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

  render() {
    return (
        <div className="index-page">
          <IndexHeader />
          <div className="container surah-list">
            <div className="row">
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
    lastVisit: userStore.getLastVisit()
  };
});

export default Index;
