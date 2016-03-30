import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ApiClient from '../../../helpers/ApiClient';

const client = new ApiClient();

const styles = require('./style.scss');

@connect(
  state => ({surahs: state.surahs.entities})
)
export default class SearchAutocomplete extends Component {
  constructor() {
    super(...arguments);

    this.state = {ayat: [], surahs: []};
    this.cached = {};
  };

  componentWillReceiveProps(nextProps) {
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
    const escaped = value.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
    const matches = [];

    for (var surahId in this.props.surahs) {
      const surah = this.props.surahs[surahId];
      if (RegExp(escaped, "i").test(surah.name.simple.replace( /['-]/g, '' ))) {
        matches.push([ surah.name.simple, surah.id ]);
      } else if (RegExp(escaped, "i").test(surah.name.arabic)) {
        matches.push([ surah.name.arabic, surah.id ]);
      }
    }

    this.setState({
      surahs: matches.sort((a, b) => a[1] < b[1] ? -1 : 1).map((match) => ({text: `<b>${match[0]}</b>`, href: `/${match[1]}`})).slice(0, 5)
    });
  };

  handleAyahSuggestions(value) {
    if (this.cached[value]) {
      this.setState({ ayat: this.cached[value] });
    } else {
      client.get('/suggest', {params: {q: value}}).then((res) => {
        this.cached[value] = res;

        if (this.props.value.trim() === value) {
          this.setState({ ayat: res });
        }
      });
    }
  };

  renderList(key) {
    return this.state[key].map((item) => (
      <li key={item.href}>
        <div>
          <div className={styles.link}>
            <a href={item.href}>{item.href}</a>
          </div>
          <div className={styles.text}>
            <a href={item.href} dangerouslySetInnerHTML={{__html: item.text }} />
          </div>
        </div>
      </li>
    );
  };

  render() {
    const { surahs, ayat } = this.state;

    return (
      <div className={`${styles.autocomplete} ${ayat.length || surahs.length ? '' : 'hidden'}`}>
        <ul role="menu" className={styles.list}>
          {this.renderList('surahs')}
          {this.renderList('ayat')}
        </ul>
      </div>
    );
  }
};
