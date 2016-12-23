import React, { PropTypes } from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Loader from 'components/Loader';

const style = require('./style.scss');

const SurahInfo = ({ surah, isShowingSurahInfo, onClose }) => {
  // So we don't need to load images and files unless needed
  if (!isShowingSurahInfo) return <noscript />;
  if (!surah.info) {
    return <Loader />;
  }

  return (
    <Col xs={12} className={`${style.container} surah-info ${style.show}`}>
      <button
        tabIndex="-1"
        className={`${style.close} ss-delete`}
        onClick={() => onClose({ isShowingSurahInfo: !isShowingSurahInfo })}
      />
      <Row className={style.row}>
        <Col
          md={3}
          xs={6}
          className={`${style.bg} ${style[surah.revelation.place]}`}
        />
        <Col md={1} xs={6} className={style.list}>
          <dl>
            <dt>VERSES</dt>
            <dd className="text-uppercase">{surah.ayat}</dd>
            <dt>PAGES</dt>
            <dd className="text-uppercase">{surah.page.join('-')}</dd>
          </dl>
        </Col>
        <Col md={8} className={`${style.info} times-new`}>
          <div dangerouslySetInnerHTML={{ __html: surah.info.description }} />
          <div>
            <p>
              <em>
                Source: {surah.info.contentSource}
              </em>
            </p>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

SurahInfo.propTypes = {
  onClose: PropTypes.func,
  loadInfo: PropTypes.func,
  isShowingSurahInfo: PropTypes.bool,
  surah: PropTypes.object
};

export default SurahInfo;
