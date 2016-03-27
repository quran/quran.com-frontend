import React from 'react';
import classNames from 'classnames';
import SearchDropdown from 'components/header/SearchDropdown';
import SurahsStore from 'stores/SurahsStore';
import connectToStores from 'fluxible-addons-react/connectToStores';
import request from 'superagent';
import Settings from 'constants/Settings';

class SearchAutocomplete extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { value: '', ayat: [], surahs: [] };
    this.cached = {};
  }
  componentWillReceiveProps( nextProps ) {
    console.log('searchautocomplete componentWillReceiveProps', nextProps);
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
      this.setState( { surahs: [] } );
    }
  };

  handleSurahSuggestions(value) {
    var escaped = value.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
    var matches = [];
    this.props.surahs.forEach( function( surah ) {
      if ( RegExp( escaped, "i" ).test( surah.name.simple.replace( /['-]/g, '' )  ) ) {
        matches.push( [ surah.name.simple, surah.id ] );
      } else
      if ( RegExp( escaped, "i" ).test( surah.name.arabic ) ) {
        matches.push( [ surah.name.arabic, surah.id ] );
      }
    } );
    matches = matches.sort(function( a, b ) {
      return RegExp( '^'+ escaped, 'i' ).test( a[0] ) ? -1 : 1;
    }).map( function( s ) {
      return { text: s[0], href: '/'+ s[1] };
    } );
    this.setState( { surahs: matches } );
  };

  handleAyahSuggestions(value) {
    var self = this;
    if ( this.cached[value] !== undefined ) {
      this.setState({ ayat: this.cached[value] });
    }
    else {
      request.get(Settings.url +'suggest')
      .query({ q: value })
      .end(function(err, res) {
        if (err) {
          return console.error( 'error getting autocomplete suggestions' );
        }
        self.cached[value] = res.body;
        if (self.state.value.trim() === value) {
          self.setState({ ayat: res.body });
        }
      });
    }
  };

  render() {
    var className = classNames({
      'searchautocomplete': true,
      'hidden': this.state.ayat.length || this.state.surahs.length ? false : true
    });

    return (
      <div className={className} style={{width:'100%',backgroundColor:'#ccc',position:'absolute',zIndex:'99', paddingTop: '10px', paddingBottom: '10px'}}>
        <SearchDropdown text={this.state.value} ayat={this.state.ayat} surahs={this.state.surahs}/>
      </div>
    );
  }
}
SearchAutocomplete.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};
SearchAutocomplete = connectToStores( SearchAutocomplete, [SurahsStore], (context, props) => {
  const surahsStore = context.getStore(SurahsStore);

  return {
    surahs: surahsStore.getSurahs()
  };
});


SearchAutocomplete.displayName = 'SearchAutocomplete';
export default SearchAutocomplete;
