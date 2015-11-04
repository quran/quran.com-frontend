import React from 'react';
import ApplicationStore from 'stores/ApplicationStore';
import provideContext from 'fluxible-addons-react/provideContext';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { handleHistory } from 'fluxible-router';
import debug from 'utils/Debug';
import ga from 'react-google-analytics';

ga('create', 'UA-8496014-1', 'auto');
ga('require', 'linkid');
ga('send', 'pageview');
const GAInitiailizer = ga.Initializer;

class Application extends React.Component {
  render() {
    const Handler = this.props.currentRoute.get('handler');

    debug('COMPONENT-APPLICATION');
    return (
      <div>
        <Handler />
        <footer>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 col-md-offset-3 col-xs-4 col-xs-offset-1 about">
                <ul className="source-sans">
                  <li><a href="/about">About</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </div>
              <div className="col-md-2 col-xs-5 links">
                <ul className="source-sans">
                  <li><a target="_blank" href="http://sunnah.com/">Sunnah.com</a></li>
                  <li><a target="_blank" href="http://salah.com/">Salah.com</a></li>
                  <li><a target="_blank" href="http://quranicaudio.com/">QuranicAudio.com</a></li>
                  <li><a target="_blank" href="http://corpus.quran.com/wordbyword.jsp">Corpus: Word by Word</a></li>
                </ul>
              </div>
              <div className="col-md-2 text-right links">
                <ul className="list-inline">
                  <li><a><i className="fa fa-facebook"></i></a></li>
                  <li><a><i className="fa fa-twitter"></i></a></li>
                  <li><a><i className="fa fa-envelope"></i></a></li>
                </ul>
                <p className="monserrat">&copy; QURAN.COM. ALL RIGHTS RESERVED 2015</p>
              </div>
            </div>
          </div>
        </footer>
        <GAInitiailizer />
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.pageTitle !== nextProps.pageTitle) {
      document.title = nextProps.pageTitle;
    }

    return this.props.currentRoute.get('handler') !== nextProps.currentRoute.get('handler');
  }

  componentDidUpdate(prevProps, prevState) {
    const newProps = this.props;

    if (newProps.pageTitle === prevProps.pageTitle) {
      return;
    }
    document.title = newProps.pageTitle;
  }
};

export default handleHistory(provideContext(connectToStores(
  Application,
  [ApplicationStore],
  function (context, props) {
    var appStore = context.getStore(ApplicationStore);
    return {
      currentPageName: appStore.getCurrentPageName(),
      pageTitle: appStore.getPageTitle(),
      pages: appStore.getPages()
    };
  }
)));
