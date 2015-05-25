'use strict';

import React from 'react';
import {navigateAction} from 'fluxible-router';

class SearchInput extends React.Component {
  constructor(props, context) {
    super(props, context);
  };

  search(e) {
    if (e.keyCode === 13) {
      let searching = e.target.value,
          ayah, pattern, surah;

      pattern = new RegExp(/\d[\.,\:,\,]\d/);

      if (pattern.test(searching)) {
        surah = searching.split(/[\.,\:,\,]/)[0];
        ayah = parseInt(searching.split(/[\.,\:,\,]/)[1]);

        this.context.executeAction(navigateAction, {
          url: '/' + surah + '/' + ayah + '-' + (ayah + 10)
        });
      } else {
        this.context.executeAction(navigateAction, {
          url: `/search?q=${searching}`
        });
      }
    }
  };

  render() {
    var className = React.addons.classSet({
      'search-input': true
    }) + ' ' + this.props.className;

    return (
      <input type="text"
             placeholder="Search"
             className={className}
             onKeyUp={this.search.bind(this)} />
    );
  }
}

SearchInput.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

SearchInput.displayName = 'SearchInput';

export default SearchInput;
