import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import connectData from 'helpers/connectData';
import debug from 'helpers/debug';

import ImageHeader from 'components/ImageHeader';
import SearchInput from 'components/SearchInput';

import { isAllLoaded, loadAll } from 'redux/modules/surahs';

const style = require('./style.scss');

function fetchData(getState, dispatch) {
  if (!isAllLoaded(getState())) {
    return dispatch(loadAll());
  }
}

@connectData(fetchData, null)
@connect(
  state => ({surahs: Object.keys(state.surahs.entities).map(id => state.surahs.entities[id])})
)
export default class Home extends Component {
  static propTypes = {
    surahs: PropTypes.array
  }

  renderColumn(array) {
    debug('component:Index', 'renderColumn');

    return array.map(surah => {
      return (
        <li className={`row ${style.link}`} key={surah.id}>
          <Link to={`/${surah.id}`}>
            <Col xs={2} className="text-muted">
              {surah.id}
            </Col>
            <Col xs={7}>
              {surah.name.simple}
              <br />
              <span className={`text-uppercase ${style.english}`}>{surah.name.english}</span>
            </Col>
            <Col xs={3} className={`text-right ${style.arabic}`}>
              {surah.name.arabic}
            </Col>
          </Link>
        </li>
      );
    });
  }

  renderColumns() {
    const { surahs } = this.props;

    return (
      <Row>
        <Col md={4} componentClass="ul" className={style.surahsList}>
          {this.renderColumn(surahs.slice(0, 38))}
        </Col>
        <Col md={4} componentClass="ul" className={style.surahsList}>
          {this.renderColumn(surahs.slice(38, 76))}
        </Col>
        <Col md={4} componentClass="ul" className={style.surahsList}>
          {this.renderColumn(surahs.slice(76, 114))}
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <div className="index-page">
        <ImageHeader>
          <SearchInput />
        </ImageHeader>
        <Grid>
          <Row>
            <Col md={10} mdOffset={1}>
              <h4 className={`text-muted text-center ${style.title}`}>SURAHS (CHAPTERS)</h4>
              {this.renderColumns()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
