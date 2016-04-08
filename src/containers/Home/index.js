import React from 'react';
import Helmet from 'react-helmet';
import IndexHeader from 'components/header/IndexHeader';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { asyncConnect } from 'redux-async-connect'
import { connect } from 'react-redux';
import moment from 'moment';

import debug from 'utils/Debug';

import { isAllLoaded, loadAll } from '../../redux/modules/surahs';

const styles = require('./style.scss');

@asyncConnect([{
  promise({ store: { getState, dispatch } }) {
    if (!isAllLoaded(getState())) {
      return dispatch(loadAll());
    }

    return true;
  }
}])
@connect(
  state => ({surahs: state.surahs.entities})
)
class Home extends React.Component {
  renderColumn(array) {
    debug('component:Index', 'renderColumn');

    return array.map((surah, i) => {
      return (
        <li className={`${styles.item}`} key={surah.id}>
          <Link to={`/${surah.id}`} className={`${styles.link} row`}>
            <div className="col-xs-2 text-muted">
              {surah.id}
            </div>
            <div className="col-xs-7">
              {surah.name.simple}
              <br />
              <span className={`text-uppercase ${styles.english}`}>{surah.name.english}</span>
            </div>
            <div className={`col-xs-3 text-right ${styles.arabic}`}>
              {surah.name.arabic}
            </div>
          </Link>
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
          <div className={`row ${styles.lastVisit}`}>
            <div className="col-md-4">
              <h4 className={`text-muted text-center ${styles.title}`}>LAST VISITED:</h4>
            </div>
            <ul className="col-md-4 list-unstyled">
              <li className={`row ${styles.link}`}>
                <Link to={`/${this.props.lastVisit.surah}/${lastVisitedAyah}-${lastVisitedAyah + 10}`}>
                  <div className="col-xs-2 text-muted">
                    {surah.id}:{this.props.lastVisit.ayah}
                  </div>
                  <div className="col-xs-7">
                    {surah.name.simple}
                    <br />
                    <span className={`text-uppercase ${styles.english}`}>
                      {surah.name.english}
                    </span>
                  </div>
                  <div className={`col-xs-3 text-right ${styles.arabic}`}>
                    {surah.name.arabic}
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    return null;
  }

  renderQuickLinks() {
    return (
      <span className="pull-right">
        <ul className="list-inline">
          <li>Quick links:</li>
          {
            moment().isSame(moment().day('Friday')) &&
            <li>
              <Link
                to="/18"
                data-metrics-event-name="QuickLinks:Click"
                data-metrics-surah-id="18">
                Surah Al-Kahf
              </Link>
              {' '}|
            </li>
          }
          <li>
            <Link
              to="/36"
              data-metrics-event-name="QuickLinks:Click"
              data-metrics-surah-id="36">
              Surah Yasin (Yaseen)
            </Link>{' '}|
          </li>
          <li>
            <Link
              to="/55"
              data-metrics-event-name="QuickLinks:Click"
              data-metrics-surah-id="55">
              Surah Ar-Rahman
            </Link>{' '}|
          </li>
          <li>
            <Link
              to="/67"
              data-metrics-event-name="QuickLinks:Click"
              data-metrics-surah-id="67">
              Surah Al-Mulk
            </Link>{' '}|
          </li>
          <li>
            <Link
              to="/2/255"
              data-metrics-event-name="QuickLinks:Click"
              data-metrics-surah-id="2/255">
              Ayat Al-Kursi
            </Link>
          </li>
        </ul>
      </span>
    );
  }

  render() {
    debug('component:Index', 'Render');

    return (
        <div className="index-page">
          <Helmet title="The Noble Quran - القرآن الكريم" titleTemplate="%s" />
          <IndexHeader />
          <div className={`container ${styles.list}`}>
            <div className="row">
              {this.renderLastVisit()}
              <div className="col-md-10 col-md-offset-1">
                <h4 className={`text-muted ${styles.title}`}>
                  SURAHS (CHAPTERS)
                  {this.renderQuickLinks()}
                </h4>
                <div className="row">
                  <ul className="col-md-4 list-unstyled">
                    {this.renderColumn(Object.values(this.props.surahs).slice(0, 38))}
                  </ul>
                  <ul className="col-md-4 list-unstyled">
                    {this.renderColumn(Object.values(this.props.surahs).slice(38, 76))}
                  </ul>
                  <ul className="col-md-4 list-unstyled">
                    {this.renderColumn(Object.values(this.props.surahs).slice(76, 114))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Home;
