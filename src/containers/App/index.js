import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as customPropTypes from 'customPropTypes';
import { metrics } from 'react-metrics';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Modal from 'react-bootstrap/lib/Modal';
import { withRouter } from 'react-router';
import { asyncComponent } from 'react-async-component';
import Loader from 'quran-components/lib/Loader';
import ComponentLoader from 'components/ComponentLoader';
import debug from 'helpers/debug';
import config from 'config';
import metricsConfig from 'helpers/metrics';
import Footer from 'components/Footer';
import NoScript from 'components/NoScript';
import { removeMedia } from '../../redux/actions/media';

import Routes from '../../components/Routes';
import Navbars from '../../components/Navbars';

const ModalHeader = Modal.Header;
const ModalTitle = Modal.Title;
const ModalBody = Modal.Body;

const GlobalSidebar = asyncComponent({
  resolve: () =>
    import(/* webpackChunkName: "GlobalSidebar" */ 'components/GlobalSidebar'),
  LoadingComponent: ComponentLoader,
});

const SmartBanner = asyncComponent({
  resolve: () =>
    import(/* webpackChunkName: "SmartBanner" */ 'components/SmartBanner'),
  LoadingComponent: ComponentLoader,
});

const NoScriptWarning = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1201;
  text-align: center;
  color: #fff;
  background-color: #ae0000;
  padding: 5px 0 5px 0;
`;

class App extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  state = {
    sidebarOpen: false,
  };

  renderModalBody() {
    const { media } = this.props;

    if (media.loading) {
      return (
        <div className="embed-responsive embed-responsive-16by9">
          <Loader isActive relative />
        </div>
      );
    }

    return (
      <div
        className={`embed-responsive embed-responsive-16by9 ${
          media.wrapperClass
        }`}
        dangerouslySetInnerHTML={{ __html: media.content.body }}
      />
    );
  }

  render() {
    const {
      footer,
      children,
      media,
      removeMedia, // eslint-disable-line no-shadow
      ...props
    } = this.props;
    // let sidebar;
    debug('component:APPLICATION', 'Render');

    /*
    if (__CLIENT__) {
      sidebar = (
        <GlobalSidebar
          open={this.state.sidebarOpen}
          handleOpen={open => this.setState({ sidebarOpen: open })}
        />
      );
    }
    else {
      sidebar = <div className='sidebar'/>;
    }
    */

    return (
      <div>
        <Helmet {...config.app.head} />
        <NoScript>
          <NoScriptWarning className="row">
            <div className="col-md-12">
              <p>
                Looks like either your browser does not support Javascript or
                its disabled. Quran.com workes best with JavaScript enabled. For
                more instruction on how to enable javascript
                <a href="http://www.enable-javascript.com/">Click here</a>
              </p>
            </div>
          </NoScriptWarning>
        </NoScript>
        <Navbars
          {...props}
          handleSidebarToggle={() =>
            this.setState({ sidebarOpen: !this.state.sidebarOpen })
          }
        />
        {
          <GlobalSidebar
            open={this.state.sidebarOpen}
            handleOpen={open => this.setState({ sidebarOpen: open })}
          />
        }
        {children || <Routes store={this.context.store} />}
        <SmartBanner title="The Noble Quran - القرآن الكريم" button="Install" />
        {footer || <Footer />}
        {__CLIENT__ &&
          media.show && (
            <Modal bsSize={media.size} show={media.show} onHide={removeMedia}>
              <ModalHeader closeButton>
                <ModalTitle className="montserrat">
                  {media.content.title}
                </ModalTitle>
              </ModalHeader>
              <ModalBody>{this.renderModalBody()}</ModalBody>
            </Modal>
          )}
      </div>
    );
  }
}

const MetricsApp = metrics(metricsConfig)(App);

App.propTypes = {
  media: customPropTypes.media.isRequired,
  removeMedia: PropTypes.func.isRequired,
  children: PropTypes.element,
  main: PropTypes.element,
  nav: PropTypes.element,
  footer: PropTypes.element,
  sidebar: PropTypes.element,
  footNote: customPropTypes.footNoteType,
  loadingFootNote: PropTypes.bool,
};

export default withRouter(
  connect(
    state => ({
      media: state.media,
    }),
    { removeMedia }
  )(MetricsApp)
);
