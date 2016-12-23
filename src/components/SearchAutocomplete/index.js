// TODO: Should be handled by redux and not component states.
// TODO: This needs to be rewritten
import React, { Component, PropTypes } from 'react';
import ApiClient from 'helpers/ApiClient';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const client = new ApiClient();

const styles = require('./style.scss');

class SearchAutocomplete extends Component {
  static propTypes = {
    surahs: PropTypes.object.isRequired,
    value: PropTypes.string,
    input: PropTypes.any,
    push: PropTypes.func.isRequired,
    lang: PropTypes.string
  };

  constructor(...args) {
    super(...args);

    this.cached = {};
    this.timer = null;
    this.delay = 200;
  }

  state = {
    ayat: [],
    surahs: []
  };

  componentDidMount() {
    this.props.input.addEventListener('keydown', this.handleInputKeyDown.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.suggest(nextProps.value);
    }, this.delay);

    return false;
  }

  suggest(value) {
    this.handleSurahSuggestions(value);

    if (value.length === 0 && this.state.surahs.length > 0) {
      this.setState({ surahs: [] });
    }

    if (value.length >= 3) {
      this.handleAyahSuggestions(value);
    } else if (this.state.ayat.length > 0) {
      this.setState({ ayat: [] });
    }
  }

  handleSurahSuggestions(value) {
    const matches = [];
    const ayahRgx = /^(\d+)(?::(\d+))?$/;

    if (ayahRgx.test(value)) {
      const captures = value.match(ayahRgx);
      const surahId = captures[1];
      const ayahNum = captures[2];
      const surah = this.props.surahs[surahId];
      matches.push([surah.name.simple, surah.id + (ayahNum ? `/${ayahNum}` : '')]);
    } else if (value.length >= 2) {
      const escaped = value.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

      Object.keys(this.props.surahs).forEach((surahId) => {
        const surah = this.props.surahs[surahId];
        if (RegExp(escaped, 'i').test(surah.name.simple.replace(/['-]/g, ''))) {
          matches.push([surah.name.simple, surah.id]);
        } else if (RegExp(escaped, 'i').test(surah.name.arabic)) {
          matches.push([surah.name.arabic, surah.id]);
        }
      });
    }

    return this.setState({
      surahs: matches.map(match => ({
        text: `<b>${match[0]}</b>`,
        href: `/${match[1]}`
      })).slice(0, 5)
    });
  }

  handleAyahSuggestions(value) {
    const { lang } = this.props;

    if (!this.cached[lang]) {
      this.cached[lang] = {};
    }

    if (this.cached[lang][value]) {
      this.setState({ ayat: this.cached[lang][value] });
    } else {
      client.get('/v2/suggest', { params: { q: value, l: lang } }).then((res) => {
        this.cached[lang][value] = res;

        if (this.props.value.trim() === value) {
          this.setState({ ayat: res });
        }
      });
    }
  }

  handleInputKeyDown(event) {
    if (!(event.keyCode === 9 || event.keyCode === 40 || event.keyCode === 27)) {
      return;
    }

    const items = this.menu.getElementsByTagName('li');

    if (!items.length) {
      return;
    }

    switch (event.keyCode) {
      case 9: // tab
        items[0].focus();
        break;
      case 27: // escape
        // TODO if open closeMenu()
        break;
      case 40: // down
        items[0].focus();
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  handleItemKeyDown(event, item) {
    const items = this.menu.getElementsByTagName('li');

    if (!items.length) {
      return;
    }

    switch (event.keyCode) {
      case 9: // tab
        return;
      case 13: // enter
        console.log(this.props);
        this.props.push(item.href); // change url
        break;
      case 27: // escape
        // TODO if open closeMenu()
        break;
      case 38: // up
        if (event.target === items[0]) { // we're on the first item, so focus the input
          this.props.input.focus();
        } else {
          event.target.previousSibling.focus();
        }
        break;
      case 40: // down
        if (event.target === items[items.length - 1]) {
          items[0].focus();
        } else {
          event.target.nextSibling.focus();
        }
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  renderList(key) {
    return this.state[key].map(item => (
      <li key={item.href} tabIndex="-1" onKeyDown={event => this.handleItemKeyDown(event, item)}>
        <div className={styles.link}>
          <a href={item.href} tabIndex="-1">{item.href}</a>
        </div>
        <div className={styles.text}>
          <a href={item.href} tabIndex="-1" dangerouslySetInnerHTML={{ __html: item.text }} />
        </div>
      </li>
    ));
  }

  render() {
    const { surahs, ayat } = this.state;

    return (
      <div className={`${styles.autocomplete} ${ayat.length || surahs.length ? '' : 'hidden'}`}>
        <ul role="menu" className={styles.list} ref={(ref) => { this.menu = ref; }}>
          {this.renderList('surahs')}
          {this.renderList('ayat')}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const surahs = state.surahs.entities;
  const surahId = state.surahs.current;
  let lang = 'en';

  if (state.ayahs && state.ayahs.entities && state.ayahs.entities[surahId]) {
    const ayahs = state.ayahs.entities[surahId];
    const ayahKey = Object.keys(ayahs)[0];

    if (ayahKey) {
      const ayah = ayahs[ayahKey];

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

export default connect(mapStateToProps, { push })(SearchAutocomplete);
