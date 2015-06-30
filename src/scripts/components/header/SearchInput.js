import React from 'react';
import {navigateAction} from 'fluxible-router';
import classNames from 'classnames';

class SearchInput extends React.Component {
  constructor(props, context) {
    super(props, context);
  };

  search(e) {
    if (e.keyCode === 13 || e.type === 'click') {
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
    var className = classNames({
      'right-inner-addon': true
    }) + ' ' + this.props.className;

    return (
      <div className={className}>
        <i className="ss-icon ss-search" onClick={this.search.bind(this)} />
        <input type="text"
               placeholder="Search"
               onKeyUp={this.search.bind(this)} />
      </div>
    );
  }
}

SearchInput.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

SearchInput.displayName = 'SearchInput';

export default SearchInput;
