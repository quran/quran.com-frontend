/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import { metrics } from 'react-metrics';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import Modal from 'react-bootstrap/lib/Modal';
import SmartBanner from 'components/SmartBanner';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import debug from 'helpers/debug';
import config from 'config';
import metricsConfig from 'helpers/metrics';
import Footer from 'components/Footer';
import NoScript from 'components/NoScript';
import FontStyles from 'components/FontStyles';
import { removeMedia } from 'redux/actions/media';

import authConnect from './connect';

const ModalHeader = Modal.Header;
const ModalTitle = Modal.Title;
const ModalBody = Modal.Body;


class App extends Component {
  static propTypes = {
    surahs: PropTypes.object.isRequired,
    media: PropTypes.object.isRequired,
    removeMedia: PropTypes.func.isRequired,
    children: PropTypes.element
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { children, media, removeMedia } = this.props; // eslint-disable-line no-shadow
    debug('component:APPLICATION', 'Render');

    return (
      <div>
        <Helmet {...config.app.head} />
        <FontStyles />
        <NoScript>
          <Row className="noscript-warning">
            <Col md={12}>
              <p>
                Looks like either your browser does not support Javascript or its disabled.
                Quran.com workes best with JavaScript enabled.
                For more instruction on how to enable javascript
                <a href="http://www.enable-javascript.com/">
                  Click here
                </a>
              </p>
            </Col>
          </Row>
        </NoScript>
        {children}
        <SmartBanner title="The Noble Quran - القرآن الكريم" button="Install" />
        <Footer />
        <Modal bsSize="large" show={!!media.content} onHide={removeMedia}>
          <ModalHeader closeButton>
            <ModalTitle className="montserrat">
              {media.content && media.content.resource.name}
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div className="embed-responsive embed-responsive-16by9">
              {
                media.content &&
                  <iframe
                    className="embed-responsive-item"
                    src={media.content.url}
                    allowFullScreen
                  />
              }
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const metricsApp = metrics(metricsConfig)(App);
const AsyncApp = asyncConnect([{ promise: authConnect }])(metricsApp);

export default connect(
  state => ({ surahs: state.surahs.entities, media: state.media }),
  { removeMedia }
)(AsyncApp);
