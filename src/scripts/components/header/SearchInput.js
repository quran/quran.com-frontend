import React from 'react';
import ReactDOM from 'react-dom';
import {navigateAction} from 'fluxible-router';
import classNames from 'classnames';
import debug from 'utils/Debug';

class SearchInput extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  search(e) {
    if (e.key === 'Enter' || e.keyCode === 13 || e.type === 'click') {
      let inputEl = ReactDOM.findDOMNode(this).querySelector('input'),
        searching = inputEl.value.trim(),
        ayah, pattern, surah;

      // prevent search function while search input field is empty
      if (searching === '') {
        // reset input to display "Search" placeholder text
        inputEl.value = '';
        return;
      }

      const shortcutSearch = /\d[\.,\:,\,,\\,//]/g;
      const splitSearch = /[\.,\:,\,,\\,//]/g;

      pattern = new RegExp(shortcutSearch);

      if (pattern.test(searching)) {
        surah = parseInt(searching.split(splitSearch)[0]);
        ayah = parseInt(searching.split(splitSearch)[1]);

        if (isNaN(ayah)) {
          ayah = 1;
        }

        this.context.executeAction(navigateAction, {
          url: '/' + surah + '/' + ayah + '-' + (ayah + 10)
        });
      } else {
        this.context.executeAction(navigateAction, {
          url: `/search?q=${searching}`
        });
      }
    }

    // This checks to see if the user is typing Arabic
    // and adjusts the text-align.
    var arabic = new RegExp(/[\u0600-\u06FF]/);
    if (arabic.test(e.target.value)) {
      e.target.style.textAlign = 'right';
    }
    else {
      e.target.style.textAlign = 'left';
    }
  }

  render() {
    var className = classNames({
      'right-inner-addon': true,
      'searchinput': true,
      [this.props.className]: true
    });

    debug('component:SearchInput', 'Render');

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
