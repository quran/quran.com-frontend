import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ApiClient from '../../../helpers/ApiClient';

@connect(
  state => ({surahs: state.surahs.entities})
)

export default class SearchAutocomplete extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { value: '', ayat: [], surahs: [] };
    this.cached = {};
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value)
      this.setState({ value: nextProps.value });
    this.suggest(nextProps.value);
  };

  suggest(value) {
    if (value.length >= 2) {
      this.handleSurahSuggestions(value);
    } else if (this.state.surahs.length > 0) this.setState({ surahs: [] });

    if (value.length >= 3) {
      this.handleAyahSuggestions(value);
    } else if (this.state.ayat.length > 0) this.setState({ ayat: [] });
  };

  handleSurahSuggestions(value) {
    var escaped = value.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
    var matches = [];
    for (var surah_id in this.props.surahs) {
      var surah = this.props.surahs[surah_id];
      if (RegExp(escaped, "i").test(surah.name.simple.replace( /['-]/g, '' ))) {
        matches.push([ surah.name.simple, surah.id ]);
      } else
      if (RegExp(escaped, "i").test(surah.name.arabic)) {
        matches.push([ surah.name.arabic, surah.id ]);
      }
    }
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
      ( new ApiClient() ).get( '/suggest', { params: { q: value }}).then((res) => {
        this.cached[value] = res;
        if (this.state.value.trim() === value) {
          this.setState({ ayat: res });
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
