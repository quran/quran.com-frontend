/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import * as customPropTypes from 'customPropTypes';
import { metrics } from 'react-metrics';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import Modal from 'react-bootstrap/lib/Modal';
import Loadable from 'react-loadable';
import ComponentLoader from 'components/ComponentLoader';
import debug from 'helpers/debug';
import config from 'config';
import metricsConfig from 'helpers/metrics';
import Footer from 'components/Footer';
import NoScript from 'components/NoScript';
import { removeMedia } from 'redux/actions/media';
import { removeFootNote } from 'redux/actions/footNote';
import Loader from 'quran-components/lib/Loader';
import authConnect from './connect';

const ModalHeader = Modal.Header;
const ModalTitle = Modal.Title;
const ModalBody = Modal.Body;

const GlobalNav = Loadable({
  loader: () => import('components/GlobalNav'),
  LoadingComponent: ComponentLoader
});

const GlobalSidebar = Loadable({
  loader: () => import('components/GlobalSidebar'),
  LoadingComponent: ComponentLoader
});

const SmartBanner = Loadable({
  loader: () => import('components/SmartBanner'),
  LoadingComponent: ComponentLoader
});

class App extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  state = {
    sidebarOpen: false
  };

  render() {
    const {
      main,
      nav,
      footer,
      children,
      media,
      footNote,
      loadingFootNote,
      removeMedia, // eslint-disable-line no-shadow
      removeFootNote, // eslint-disable-line no-shadow
      ...props
    } = this.props;
    debug('component:APPLICATION', 'Render');
    let footNoteText;

    if (footNote) {
      footNoteText = footNote.text;
    } else {
      footNoteText = <Loader isActive={loadingFootNote} />;
    }

    return (
      <div>
        <Helmet {...config.app.head} />
        <NoScript>
          <div className="row noscript-warning">
            <div className="col-md-12">
              <p>
                Looks like either your browser does not support Javascript or its disabled.
                Quran.com works best with JavaScript enabled.
                For more instruction on how to enable javascript
                <a href="http://www.enable-javascript.com/">
                  Click here
                </a>
              </p>
            </div>
          </div>
        </NoScript>
        {React.cloneElement(nav || <GlobalNav isStatic {...props} />, {
          handleSidebarToggle: () =>
            this.setState({ sidebarOpen: !this.state.sidebarOpen })
        })}
        {__CLIENT__ &&
          <GlobalSidebar
            open={this.state.sidebarOpen}
            handleOpen={open => this.setState({ sidebarOpen: open })}
          />}
        {children || main}
        <SmartBanner title="The Noble Quran - القرآن الكريم" button="Install" />
        {React.cloneElement(footer || <Footer />)}
        {__CLIENT__ &&
          <Modal
            bsSize="large"
            show={media && media.content}
            onHide={removeMedia}
          >
            <ModalHeader closeButton>
              <ModalTitle className="montserrat">
                {media.content && media.content.authorName}
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              <div
                className="embed-responsive embed-responsive-16by9"
                dangerouslySetInnerHTML={{
                  __html: media.content && media.content.embedText
                }}
              />
            </ModalBody>
          </Modal>}
        {__CLIENT__ &&
          <Modal
            bsSize="large"
            show={!!footNote || loadingFootNote}
            onHide={removeFootNote}
          >
            <ModalHeader closeButton>
              <ModalTitle className="montserrat">
                Foot note
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              <div
                className={`${footNote && footNote.languageName}`}
                dangerouslySetInnerHTML={{ __html: footNoteText }}
              />
            </ModalBody>
          </Modal>}
      </div>
    );
  }
}

const metricsApp = metrics(metricsConfig)(App);
const AsyncApp = asyncConnect([{ promise: authConnect }])(metricsApp);

App.propTypes = {
  media: customPropTypes.media.isRequired,
  removeMedia: PropTypes.func.isRequired,
  removeFootNote: PropTypes.func.isRequired,
  children: PropTypes.element,
  main: PropTypes.element,
  nav: PropTypes.element,
  footer: PropTypes.element,
  footNote: customPropTypes.footNoteType,
  loadingFootNote: PropTypes.bool
};

export default connect(
  state => ({
    media: state.media,
    footNote: state.footNote.footNote,
    loadingFootNote: state.footNote.loadingFootNote
  }),
  { removeMedia, removeFootNote }
)(AsyncApp);
