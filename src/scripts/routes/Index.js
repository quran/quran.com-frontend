import React from 'react';
import IndexHeader from 'components/header/IndexHeader';
import {NavLink} from 'fluxible-router';
import {connectToStores, provideContext} from 'fluxible/addons';
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
      )
    });
  }

  renderLastVisit() {
    if (this.props.lastVisit) {
      let surah = this.props.surahs[this.props.lastVisit.surah - 1];

      return (
        <div className="col-md-10 col-md-offset-1">
          <h4 className="text-muted text-center title">Last Visit:</h4>
          <div className="row">
            <ul className="col-md-4 col-md-offset-4">
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
      )
    }

    return;
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

Index = connectToStores(Index, [SurahsStore, UserStore], (stores, props) => {
  return {
    surahs: stores.SurahsStore.getSurahs(),
    lastVisit: stores.UserStore.getLastVisit()
  }
});

export default Index;
