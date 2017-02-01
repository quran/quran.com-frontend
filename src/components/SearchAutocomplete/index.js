// TODO: Should be handled by redux and not component states.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { surahType } from 'types';

import { suggest } from 'redux/actions/suggest';

const styles = require('./style.scss');

const ayahRegex = /^(\d+)(?::(\d+))?$/;

class SearchAutocomplete extends Component {
  static propTypes = {
    chapters: PropTypes.objectOf(surahType).isRequired,
    value: PropTypes.string,
    // TODO: This should not be doing html stuff. Should use react onKeydown.
    input: PropTypes.any, // eslint-disable-line
    push: PropTypes.func.isRequired,
    suggest: PropTypes.func.isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.shape({
      ayah: PropTypes.string,
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })),
    lang: PropTypes.string,
    delay: PropTypes.number,
  };

  static defaultProps = {
    delay: 200
  }

  componentDidMount() {
    this.props.input.addEventListener('keydown', this.handleInputKeyDown.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.suggest(nextProps.value);
      }, this.props.delay);
    }

    return false;
  }

  getSuggestions() {
    let suggestions = this.getSurahSuggestions(this.props.value);

    if (this.props.suggestions) {
      suggestions = suggestions.concat(this.props.suggestions);
    }

    return suggestions;
  }

  getSurahSuggestions = (value) => {
    const matches = [];

    if (!value) return matches;

    const isAyahKeySearch = ayahRegex.test(value);

    if (isAyahKeySearch) {
      const captures = value.match(ayahRegex);
      const chapterId = captures[1];
      const ayahNum = captures[2];
      const chapter = this.props.chapters[chapterId];
      matches.push([chapter.name.simple, chapter.chapterNumber + (ayahNum ? `/${ayahNum}` : '')]);
    } else if (value.length >= 2) {
      const escaped = value.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

      Object.keys(this.props.chapters).forEach((chapterId) => {
        const chapter = this.props.chapters[chapterId];
        if (RegExp(escaped, 'i').test(chapter.name.simple.replace(/['-]/g, ''))) {
          matches.push([chapter.nameSimple, chapter.chapterNumber]);
        } else if (RegExp(escaped, 'i').test(chapter.nameArabic)) {
          matches.push([chapter.nameArabic, chapter.chapterNumber]);
        }
      });
    }

    return matches.map(match => ({
      text: `<b>${match[0]}</b>`,
      href: `/${match[1]}`
    })).slice(0, 5);
  }

  suggest = (query) => {
    const { lang } = this.props;

    if (!query || ayahRegex.test(query)) return false;

    return this.props.suggest(query, lang);
  }

  handleInputKeyDown = (event) => {
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

  renderList() {
    if (!this.getSuggestions().length) {
      return false;
    }

    return this.getSuggestions().map(item => (
      <li // eslint-disable-line
        key={item.href}
        tabIndex="-1"
        onKeyDown={event => this.handleItemKeyDown(event, item)}
      >
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
    return (
      <div className={`${styles.autocomplete} ${!this.getSuggestions().length && 'hidden'}`}>
        <ul role="menu" className={styles.list} ref={(ref) => { this.menu = ref; }}>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const chapters = state.chapters.entities;
  const chapterId = state.chapters.current;
  const suggestions = state.suggestResults.results[ownProps.value];
  let lang = 'en';

  if (state.ayahs && state.ayahs.entities && state.ayahs.entities[chapterId]) {
    const ayahs = state.ayahs.entities[chapterId];
    const ayahKey = Object.keys(ayahs)[0];

    if (ayahKey) {
      const ayah = ayahs[ayahKey];

      if (ayah.content && ayah.content[0] && ayah.content[0].lang) {
        lang = ayah.content[0].lang;
      }
    }
  }

  return {
    chapters,
    suggestions,
    lang
  };
}

export default connect(mapStateToProps, { push, suggest })(SearchAutocomplete);
