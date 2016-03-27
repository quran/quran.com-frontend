import React from 'react';
import ReactDOM from 'react-dom';
import {navigateAction} from 'fluxible-router';
import classNames from 'classnames';
import debug from 'utils/Debug';
import request from 'superagent';
import Settings from 'constants/Settings';
import SearchDropdown from 'components/header/SearchDropdown';

class SearchInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { value: '', data: [] };
    this.cached = {};
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

    this.suggest(e);
  }

  suggest(e) {
    //console.log('onKeyUp suggest', e.target.value, 'key', e.key, '--');
    this.setState({ value: e.target.value });
    var value = e.target.value.trim();

    //console.log('does cache exist? value',value,'e',e.target.value, 'cached data', this.cached[value]);
    //console.log('value',value,'cached=',this.cached[value],'state=',this.state.data);

    if (value.length >= 3) {
      if ( this.cached[value] !== undefined ) {
        this.setState({ data: this.cached[value] });
      }
      else {
        var self = this;
        //console.log('request',e.target.value);
        request.get(Settings.url +'suggest')
        .query({ q: value })
        .end(function(err, res) {
          //console.log('response',value);
          if (err) {
            return console.error( 'error getting autocomplete suggestions' );
          }
          self.cached[value] = res.body;
          if (self.state.value.trim() === value) {
            self.setState({ data: res.body });
          }
          else {
            //console.log( 'STATE != VALUE NEW IS', self.state.value.trim(), 'OLD IS', value );
          }
        });
      }
    }
    else {
      this.setState({ data: [] });
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
               onKeyUp={this.search.bind(this)}/>
        <SearchDropdown text={this.state.value} list={this.state.data}/>
      </div>
    );
  }
}

SearchInput.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

SearchInput.displayName = 'SearchInput';

export default SearchInput;
