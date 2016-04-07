import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ApiClient from '../../helpers/ApiClient';

const client = new ApiClient();

const styles = require('./style.scss');

@connect(
  (state, ownProps) => {
    const surahs = state.surahs.entities;
    const surahId = state.surahs.current;
    let lang = 'en';
    if (state.ayahs && state.ayahs.entities && state.ayahs.entities[surahId]) {
      const ayahs = state.ayahs.entities[surahId];
      const ayahKey = Object.keys(ayahs)[0];

      if (ayahKey) {
        const ayah = ayahs[ayahKey];
        const content = ayah.content;
        if (ayah.content && ayah.content[0] && ayah.content[0].lang) {
          lang = ayah.content[0].lang;
        }
      }
    }

    return {
      surahs,
      lang
    };
  }
)
export default class SearchAutocomplete extends Component {
  constructor() {
    super(...arguments);

    this.state = {ayat: [], surahs: []};
    this.cached = {};
    this.timer = null;
    this.delay = 200;
  };

  componentWillReceiveProps(nextProps) {
    if (this.timer)
      clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.suggest(nextProps.value);
    }, this.delay);
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
    const matches = [];
    const ayahRgx = /^(\d+)(?::(\d+))?$/;

    if (ayahRgx.test(value)) {
      const captures = value.match(ayahRgx);
      const surahId = captures[1];
      const ayahNum = captures[2];
      const surah = this.props.surahs[surahId];
      matches.push([ surah.name.simple, surah.id + (ayahNum? '/'+ ayahNum : '') ]);
    }
    else {
      const escaped = value.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
      for (var surahId in this.props.surahs) {
        const surah = this.props.surahs[surahId];
        if (RegExp(escaped, "i").test(surah.name.simple.replace( /['-]/g, '' ))) {
          matches.push([ surah.name.simple, surah.id ]);
        } else if (RegExp(escaped, "i").test(surah.name.arabic)) {
          matches.push([ surah.name.arabic, surah.id ]);
        }
      }
    }

    this.setState({
      surahs: matches.sort((a, b) => a[1] < b[1] ? -1 : 1).map((match) => ({text: `<b>${match[0]}</b>`, href: `/${match[1]}`})).slice(0, 5)
    });
  };

  handleAyahSuggestions(value) {
    const { lang } = this.props;

    if (!this.cached[lang]) {
      this.cached[lang] = {};
    }

    if (this.cached[lang][value]) {
      this.setState({ ayat: this.cached[lang][value] });
    } else {
      client.get('/suggest', {params: {q: value, l:lang}}).then((res) => {
        this.cached[lang][value] = res;

        if (this.props.value.trim() === value) {
          this.setState({ ayat: res });
        }
      });
    }
  };

  renderList(key) {
    return this.state[key].map((item) => (
      <li key={item.href}>
        <div className={styles.link}>
          <a href={item.href}>{item.href}</a>
        </div>
        <div className={styles.text}>
          <a href={item.href} dangerouslySetInnerHTML={{__html: item.text }} />
        </div>
      </li>
    ));
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
