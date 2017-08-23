/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as customPropTypes from 'customPropTypes';
import { Switch, Route, Redirect, withRouter, matchPath } from 'react-router';
import { metrics } from 'react-metrics';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Modal from 'react-bootstrap/lib/Modal';
import Loadable from 'react-loadable';
import { routes, navs } from 'routes';
import ComponentLoader from 'components/ComponentLoader';
import debug from 'helpers/debug';
import config from 'config';
import metricsConfig from 'helpers/metrics';
import NoScript from 'components/NoScript';
import { removeMedia } from 'redux/actions/media';
import Loader from 'quran-components/lib/Loader';

const ModalHeader = Modal.Header;
const ModalTitle = Modal.Title;
const ModalBody = Modal.Body;

const Footer = Loadable({
  loader: () => import(/* webpackChunkName: "footer" */ 'components/Footer'),
  loading: ComponentLoader
});

const GlobalSidebar = Loadable({
  loader: () =>
    import(/* webpackChunkName: "globalsidebar" */ 'components/GlobalSidebar'),
  loading: ComponentLoader
});

const SmartBanner = Loadable({
  loader: () =>
    import(/* webpackChunkName: "smartbanner" */ 'components/SmartBanner'),
  loading: ComponentLoader
});

class App extends Component {
  state = {
    sidebarOpen: false
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
        className={`embed-responsive embed-responsive-16by9 ${media.wrapperClass}`}
        dangerouslySetInnerHTML={{ __html: media.content.body }}
      />
    );
  }

  render() {
    const {
      footer,
      location,
      media,
      removeMedia, // eslint-disable-line no-shadow
      ...props
    } = this.props;
    debug('component:APPLICATION', 'Render');

    return (
      <div>
        <Helmet {...config.app.head} />
        <NoScript>
          <div className="row noscript-warning">
            <div className="col-md-12">
              <p>
                Looks like either your browser does not support Javascript or its disabled.
                Quran.com workes best with JavaScript enabled.
                For more instruction on how to enable javascript
                <a href="http://www.enable-javascript.com/">
                  Click here
                </a>
              </p>
            </div>
          </div>
        </NoScript>
        <Switch>
          {navs.map(({ component: NavComponent, ...nav }) => (
            <Route
              {...nav}
              render={routeProps => (
                <NavComponent
                  {...routeProps}
                  handleSidebarToggle={() =>
                    this.setState({ sidebarOpen: !this.state.sidebarOpen })}
                />
              )}
            />
          ))}
        </Switch>
        <Switch>
          {routes.map(route => <Route {...route} />)}
          <Redirect from="/:chapterId:(:range)" to="/:chapterId(/:range)" />
          <Redirect from="/:chapterId/:from::to" to="/:chapterId/:from-:to" />
        </Switch>
        <SmartBanner title="The Noble Quran - القرآن الكريم" button="Install" />
        {footer || <Footer />}
        {__CLIENT__ &&
          media.show &&
          <Modal bsSize={media.size} show={media.show} onHide={removeMedia}>
            <ModalHeader closeButton>
              <ModalTitle className="montserrat">
                {media.content.title}
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              {this.renderModalBody()}
            </ModalBody>
          </Modal>}
      </div>
    );
  }
}

const metricsApp = metrics(metricsConfig)(App);

App.propTypes = {
  media: customPropTypes.media.isRequired,
  removeMedia: PropTypes.func.isRequired,
  children: PropTypes.element,
  main: PropTypes.element,
  nav: PropTypes.element,
  footer: PropTypes.element,
  sidebar: PropTypes.element,
  footNote: customPropTypes.footNoteType,
  loadingFootNote: PropTypes.bool
};

export default withRouter(
  connect(
    state => ({
      media: state.media
    }),
    { removeMedia }
  )(metricsApp)
);
