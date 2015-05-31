import React from 'react';
import {NavLink} from 'fluxible-router';
import SurahsStore from 'stores/SurahsStore';
import {connectToStores} from 'fluxible/addons';
import debug from 'utils/Debug';
import classNames from 'classnames';

class SurahsNav extends React.Component{
  constructor(props) {
    super(props);
  }

  _list() {
    return this.props.surahs.map((surah) => {
      return (
        <li key={surah.id + 'surah'}>
          <NavLink routeName="surah" navParams={{surahId: surah.id}}>
            <div className="row">
              <div className="col-md-2 col-xs-1">
                <span className="surah-num">
                  {surah.id}
                </span>
              </div>
              <div className="col-md-7 col-xs-8">
                <span className="suran-name">{surah.name.simple}</span>
                <br />
                <span className="surah-meaning">{surah.name.english}</span>
              </div>
              <div className="col-md-3 col-xs-3 text-right">
                {surah.name.arabic}
              </div>
            </div>
          </NavLink>
        </li>
      );
    });
  }

  shouldComponentUpdate(nextState, nextProps) {
    return this.props.surahs.length !== nextState.surahs.length
  }

  render() {
    let classes = classNames({
      'surahs-nav col-md-2 col-xs-12': true
    }) + ' ' + this.props.className;

    return (
      <div className={classes}>
        <ul>
          {this._list()}
        </ul>
      </div>
    );
  }
}

SurahsNav.contextTypes = {
  getStore: React.PropTypes.func.isRequired,
  executeAction: React.PropTypes.func.isRequired
};

SurahsNav = connectToStores(SurahsNav, [SurahsStore], (stores, props) => {
  return {
    surahs: stores.SurahsStore.getSurahs()
  }
});

export default SurahsNav;
