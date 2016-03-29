import React, { Component, PropTypes } from 'react';
import request from 'superagent';
import Settings from 'constants/Settings';

export default class SearchAutocomplete extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { value: '', ayat: [], surahs: [] };
    this.cached = {};
  }
  componentWillReceiveProps( nextProps ) {
    this.setState({ value: nextProps.value });
    this.suggest( nextProps.value );
  };

  suggest(value) {
    if (value.length >= 2) {
      this.handleSurahSuggestions(value);
      if (value.length >= 3) {
        this.handleAyahSuggestions(value);
      }
      else {
        this.setState({ ayat: [] });
      }
    }
    else {
      this.setState({ surahs: [] });
    }
  };

  handleSurahSuggestions(value) {
    return;
    var escaped = value.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
    var matches = [];
    this.props.surahs.forEach(function(surah) {
      if (RegExp(escaped, "i").test(surah.name.simple.replace( /['-]/g, '' ))) {
        matches.push([ surah.name.simple, surah.id ]);
      } else
      if (RegExp(escaped, "i").test(surah.name.arabic)) {
        matches.push([ surah.name.arabic, surah.id ]);
      }
    });
    matches = matches.sort(function( a, b ) {
      return a[1] < b[1] ? -1 : 1; // <-- order by surah id
    }).map(function(match) {
      var text = match[0];
      return { text: '<b>'+ text +'</b>', href: '/'+ match[1] };
    }).slice(0, 5);
    this.setState({ surahs: matches });
  };

  handleAyahSuggestions(value) {
    if (this.cached[value] !== undefined) {
      this.setState({ ayat: this.cached[value] });
    }
    else {
      request.get(Settings.url +'suggest')
      .query({ q: value })
      .end((err, res) => {
        if (err) {
          return console.error( 'error getting autocomplete suggestions' );
        }
        this.cached[value] = res.body;
        if (this.state.value.trim() === value) {
          this.setState({ ayat: res.body });
        }
      });
    }
  };

  renderList(key) {
    return this.state[key].map((item) => {
      return this.renderItem(item);
    });
  };

  renderItem(item) {
    return (
      <li key={item.href}>
        <div>
          <div className="item-href">
            <a href={item.href}>{item.href}</a>
          </div>
          <div className="item-text">
            <a href={item.href} dangerouslySetInnerHTML={{__html: item.text }} />
          </div>
        </div>
      </li>
    );
  };

  render() {
    var className = 'search-autocomplete' +((this.state.ayat.length || this.state.surahs.length)? '' : ' hidden');
    return (
      <div className={className}>
        <ul role="menu">
          {this.renderList('surahs')}
          {this.renderList('ayat')}
        </ul>
      </div>
    );
  }
};

//
//
//SearchAutocomplete.displayName = 'SearchAutocomplete';
//export default SearchAutocomplete;
//import React from 'react';
//import classNames from 'classnames';
//import SurahsStore from 'stores/SurahsStore';
//import connectToStores from 'fluxible-addons-react/connectToStores';
//import request from 'superagent';
//import Settings from 'constants/Settings';
//
//class SearchAutocomplete extends React.Component {
//  constructor(props, context) {
//    super(props, context);
//    this.state = { value: '', ayat: [], surahs: [] };
//    this.cached = {};
//  }
//  componentWillReceiveProps( nextProps ) {
//    //console.log('searchautocomplete componentWillReceiveProps', nextProps);
//    this.setState({ value: nextProps.value });
//    this.suggest( nextProps.value );
//  };
//
//  suggest(value) {
//    if (value.length >= 2) {
//      this.handleSurahSuggestions(value);
//      if (value.length >= 3) {
//        this.handleAyahSuggestions(value);
//      }
//      else {
//        this.setState({ ayat: [] });
//      }
//    }
//    else {
//      this.setState( { surahs: [] } );
//    }
//  };
//
//  handleSurahSuggestions(value) {
//    var escaped = value.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
//    var matches = [];
//    this.props.surahs.forEach( function( surah ) {
//      if ( RegExp( escaped, "i" ).test( surah.name.simple.replace( /['-]/g, '' )  ) ) {
//        matches.push( [ surah.name.simple, surah.id ] );
//      } else
//      if ( RegExp( escaped, "i" ).test( surah.name.arabic ) ) {
//        matches.push( [ surah.name.arabic, surah.id ] );
//      }
//    } );
//    matches = matches.sort(function( a, b ) {
//      return a[1] < b[1] ? -1 : 1; // <-- order by surah id
//      return RegExp( '^'+ escaped, 'i' ).test( a[0] ) ? -1 : 1; // <-- order by whether it starts the same
//    }).map( function( s ) {
//      // var text = s[0].replace(RegExp(escaped, "gi"), "<mark>$&</mark>"); // <-- this will highlight the matched part
//      var text = s[0];
//      return { text: '<b>'+ text +'</b>', href: '/'+ s[1] };
//    } ).slice(0,5);
//    this.setState( { surahs: matches } );
//  };
//
//  handleAyahSuggestions(value) {
//    var self = this;
//    if ( this.cached[value] !== undefined ) {
//      this.setState({ ayat: this.cached[value] });
//    }
//    else {
//      request.get(Settings.url +'suggest')
//      .query({ q: value })
//      .end(function(err, res) {
//        if (err) {
//          return console.error( 'error getting autocomplete suggestions' );
//        }
//        self.cached[value] = res.body;
//        if (self.state.value.trim() === value) {
//          self.setState({ ayat: res.body });
//        }
//      });
//    }
//  };
//
//  renderList(key) {
//    return this.state[key].map((item) => {
//      return this.renderItem(item);
//    });
//  };
//
//  renderItem(item) {
//    return (
//      <li key={item.href}>
//        <div>
//          <div className="item-href">
//            <a href={item.href}>{item.href}</a>
//          </div>
//          <div className="item-text">
//            <a href={item.href} dangerouslySetInnerHTML={{__html: item.text }} />
//          </div>
//        </div>
//      </li>
//    );
//  };
//
//  render() {
//    var className = classNames({
//      'search-autocomplete': true,
//      'hidden': this.state.ayat.length || this.state.surahs.length ? false : true
//    });
//
//    return (
//      <div className={className}>
//        <ul role="menu">
//          {this.renderList('surahs')}
//          {this.renderList('ayat')}
//        </ul>
//      </div>
//    );
//  }
//}
//SearchAutocomplete.contextTypes = {
//  executeAction: React.PropTypes.func.isRequired
//};
//SearchAutocomplete = connectToStores( SearchAutocomplete, [SurahsStore], (context, props) => {
//  const surahsStore = context.getStore(SurahsStore);
//
//  return {
//    surahs: surahsStore.getSurahs()
//  };
//});
//
//
//SearchAutocomplete.displayName = 'SearchAutocomplete';
//export default SearchAutocomplete;
