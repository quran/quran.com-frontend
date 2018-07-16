// TODO: Should be handled by redux and not component states.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as customPropTypes from 'customPropTypes';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { suggest } from '../../redux/actions/suggest';

const ayahRegex = /^(\d+)(?::(\d+))?$/;

const Container = styled.div`
  width: 100%;
  background-color: #ccc;
  position: absolute;
  z-index: 99;
`;

const List = styled.ul`
  left: 0;
  z-index: 1;
  min-width: 100%;
  box-sizing: border-box;
  list-style: none;
  padding: 0;
  margin: 0.2em 0 0;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0.05em 0.2em 0.6em rgba(0, 0, 0, 0.2);
  text-shadow: none;

  &:before {
    content: '';
    position: absolute;
    top: -0.23em;
    left: 1em;
    width: 0;
    height: 0;
    padding: 0.4em;
    background: white;
    border: inherit;
    border-right: 0;
    border-bottom: 0;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  & > li {
    position: relative;
    cursor: pointer;
    text-align: left;
  }

  .text {
    overflow: hidden;
    word-wrap: break-word;
    white-space: nowrap;
    line-height: 28px;
    padding-left: 10px;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    a {
      display: block;
    }
  }

  & > li:hover .text,
  & > li:focus .text {
    background-color: rgba(${props => props.theme.brandPrimary}, 0.5);
    color: ${props => props.textColor};
  }

  & > li:hover .text a,
  & > li:focus .text a {
    color: #444;
  }

  & > li:hover .link a,
  & > li:focus .link a {
    color: #444;
  }

  & > li[aria-selected='true'] .text {
    background: hsl(205, 40%, 40%);
    color: white;
  }

  & li:hover mark,
  & li:focus mark {
    background: hsl(68, 100%, 41%);
  }

  li[aria-selected='true'] mark {
    background: hsl(86, 100%, 21%);
    color: inherit;
  }

  mark {
    background: hsl(65, 100%, 50%);
  }
`;

const StyledLink = styled.div`
  position: absolute;
  right: 0;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  padding-left: 70px;
  padding-right: 10px;
  line-height: 28px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    white 40%,
    rgba(255, 255, 255, 1)
  );
  z-index: 2;
  text-align: right;
`;

class SearchAutocomplete extends Component {
  componentDidMount() {
    this.props.input.addEventListener(
      'keydown',
      this.handleInputKeyDown.bind(this)
    );
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

    const isverseKeySearch = ayahRegex.test(value);

    if (isverseKeySearch) {
      const captures = value.match(ayahRegex);
      const chapterId = captures[1];
      const ayahNum = captures[2];
      const chapter = this.props.chapters[chapterId];
      matches.push([
        chapter.nameSimple,
        chapter.chapterNumber + (ayahNum ? `/${ayahNum}` : '')
      ]);
    } else if (value.length >= 2) {
      const escaped = value.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

      Object.keys(this.props.chapters).forEach((chapterId) => {
        const chapter = this.props.chapters[chapterId];
        if (
          RegExp(escaped, 'i').test(chapter.nameSimple.replace(/['-]/g, ''))
        ) {
          matches.push([chapter.nameSimple, chapter.chapterNumber]);
        } else if (RegExp(escaped, 'i').test(chapter.nameArabic)) {
          matches.push([chapter.nameArabic, chapter.chapterNumber]);
        }
      });
    }

    return matches
      .map(match => ({
        text: `<b>${match[0]}</b>`,
        href: `/${match[1]}`
      }))
      .slice(0, 5);
  };

  suggest = (query) => {
    const { lang } = this.props;

    if (!query || ayahRegex.test(query)) return false;

    return this.props.suggest(query, lang);
  };

  handleInputKeyDown = (event) => {
    if (
      !(event.keyCode === 9 || event.keyCode === 40 || event.keyCode === 27)
    ) {
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
  };

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
        if (event.target === items[0]) {
          // we're on the first item, so focus the input
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
        <StyledLink>
          <a href={item.href} tabIndex="-1">
            {item.ayah}
          </a>
        </StyledLink>
        <div className="text">
          <a
            href={item.href}
            tabIndex="-1"
            dangerouslySetInnerHTML={{ __html: item.text }}
          />
        </div>
      </li>
    ));
  }

  render() {
    return (
      <Container className={!this.getSuggestions().length && 'hidden'}>
        <List
          role="menu"
          ref={(ref) => {
            this.menu = ref;
          }}
        >
          {this.renderList()}
        </List>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const chapters = state.chapters.entities;
  const chapterId = state.chapters.current;
  const suggestions = state.suggestResults.results[ownProps.value];
  let lang = 'en';

  if (
    state.verses &&
    state.verses.entities &&
    state.verses.entities[chapterId]
  ) {
    const ayahs = state.verses.entities[chapterId];
    const verseKey = Object.keys(ayahs)[0];

    if (verseKey) {
      const ayah = ayahs[verseKey];

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

SearchAutocomplete.propTypes = {
  chapters: customPropTypes.chapters.isRequired,
  value: PropTypes.string,
  // TODO: This should not be doing html stuff. Should use react onKeydown.
  input: PropTypes.any, // eslint-disable-line
  push: PropTypes.func.isRequired,
  suggest: PropTypes.func.isRequired,
  suggestions: customPropTypes.suggestions,
  lang: PropTypes.string,
  delay: PropTypes.number
};

SearchAutocomplete.defaultProps = {
  delay: 200
};

export default connect(mapStateToProps, { push, suggest })(SearchAutocomplete);
