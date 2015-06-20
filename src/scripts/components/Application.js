import React from 'react';
import Nav from 'components/Nav';
import ApplicationStore from 'stores/ApplicationStore';
import provideContext from 'fluxible/addons/provideContext';
import connectToStores from 'fluxible/addons/connectToStores';
import { handleHistory } from 'fluxible-router';
import debug from 'utils/Debug';

var ga = require('react-google-analytics');
ga('create', 'UA-8496014-2', 'auto');
ga('send', 'pageview');

var GAInitiailizer = ga.Initializer;

var Application = React.createClass({
  render: function () {
    debug('COMPONENT-APPLICATION')
    var Handler = this.props.currentRoute.get('handler');
    return (
      <div>
        <Handler />
        <footer>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 col-md-offset-2 col-xs-4 col-xs-offset-1 about">
                <ul className="source-sans">
                  <li><a href="/about">About</a></li>
                  <li><a href="http://quran.zendesk.com">Support</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </div>
              <div className="col-md-2 col-xs-5 links">
                <ul className="source-sans">
                  <li><a href="http://sunnah.com/">Sunnah.com</a></li>
                  <li><a href="http://salah.com/">Salah.com</a></li>
                  <li><a href="http://quranicaudio.com/">Quranicaudio.com</a></li>
                  <li><a href="">Word by Word</a></li>
                </ul>
              </div>
              <div className="col-md-4 text-right">
                <ul className="list-inline">
                  <li><a><i className="fa fa-facebook"></i></a></li>
                  <li><a><i className="fa fa-twitter"></i></a></li>
                  <li><a><i className="fa fa-envelope"></i></a></li>
                </ul>
                <p className="monserrat">©QURAN.COM. ALL RIGHTS RESERVED 2015</p>
              </div>
            </div>
          </div>
        </footer>
        <GAInitiailizer />
      </div>
    );
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (this.props.pageTitle !== nextProps.pageTitle) {
      document.title = nextProps.pageTitle;
    }
    
    return this.props.currentRoute.get('handler') !== nextProps.currentRoute.get('handler');
  },

  componentDidUpdate: function(prevProps, prevState) {
    const newProps = this.props;

    console.log(newProps.pageTitle);
    if (newProps.pageTitle === prevProps.pageTitle) {
        return;
    }
    document.title = newProps.pageTitle;
  }
});

export default handleHistory(provideContext(connectToStores(
  Application,
  [ApplicationStore],
  function (stores, props) {
    var appStore = stores.ApplicationStore;
    return {
      currentPageName: appStore.getCurrentPageName(),
      pageTitle: appStore.getPageTitle(),
      pages: appStore.getPages()
    };
  }
)));
