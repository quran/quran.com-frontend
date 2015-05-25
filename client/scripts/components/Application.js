import React from 'react';
import Nav from 'components/Nav';
import ApplicationStore from 'stores/ApplicationStore';
import provideContext from 'fluxible/addons/provideContext';
import connectToStores from 'fluxible/addons/connectToStores';
import { handleHistory } from 'fluxible-router';
import debug from 'utils/Debug';

var Application = React.createClass({
  render: function () {
    debug('COMPONENT-APPLICATION')
    var Handler = this.props.currentRoute.get('handler');

    return (
      <div>
          <Handler />
      </div>
    );
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props.currentRoute.get('handler') !== nextProps.currentRoute.get('handler');
  },

  componentDidUpdate: function(prevProps, prevState) {
    const newProps = this.props;
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
