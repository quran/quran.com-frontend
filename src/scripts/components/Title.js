import React from 'react';
import connectToStores from 'fluxible/addons/connectToStores';
import provideContext from 'fluxible/addons/provideContext';
import ApplicationStore from 'stores/ApplicationStore';

class Title extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.context = this.props.context;

    console.log(this.props.context, this.context)
  }

  render() {
    return (
      <title>{this.props.currentTitle}</title>
    );
  }
}

Title = provideContext(connectToStores(Title, [ApplicationStore], (stores, props) => {
  console.log(stores.ApplicationStore.getPageTitle());

  return {
    currentTitle: stores.ApplicationStore.getPageTitle()
  }
}));

Title.contextTypes = {
  getStore: React.PropTypes.func.isRequired,
  executeAction: React.PropTypes.func.isRequired
}

export default Title;
