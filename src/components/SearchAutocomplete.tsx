import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { ChapterShape, SuggestionShape } from '../shapes';
import { FetchSuggest } from '../redux/actions/suggest';

const verseRegex = /^(\d+)(?::(\d+))?$/;

const Container = styled.div`
  width: 100%;
  background-color: #ccc;
  position: absolute;
  z-index: 99;
`;

const List = styled.ul<{ textColor?: string }>`
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
    background-color: rgba(${({ theme }) => theme.brandPrimary}, 0.5);
    color: ${({ textColor }) => textColor};
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

const propTypes = {
  fetchSuggest: PropTypes.func.isRequired,
  chapters: PropTypes.shape({
    chapterId: ChapterShape,
  }),
  value: PropTypes.string,
  suggestions: PropTypes.arrayOf(SuggestionShape),
  lang: PropTypes.string,
};

const defaultProps = {
  lang: '',
  value: '',
  chapters: {},
  suggestions: [],
};

type Props = {
  fetchSuggest: FetchSuggest;
  chapters?: { [chapterId: string]: ChapterShape };
  value?: string;
  suggestions?: Array<SuggestionShape>;
  lang?: string;
};

class SearchAutocomplete extends Component<Props & typeof defaultProps> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentDidUpdate(prevProps: Props) {
    const { value } = this.props;

    if (value !== prevProps.value) {
      return this.fetchSuggest();
    }

    return null;
  }

  fetchSuggest = debounce(() => {
    const { fetchSuggest, value, lang } = this.props;

    if (!value || verseRegex.test(value)) return null;

    return fetchSuggest(value, lang);
  }, 500);

  getSuggestions() {
    const { value, suggestions } = this.props;
    const totalSuggestions = [];

    const chapterSuggestions = this.getChapterSuggestions(value);

    if (chapterSuggestions) {
      return [...suggestions, ...chapterSuggestions];
    }

    return suggestions;
  }

  getChapterSuggestions = (value: string) => {
    const { chapters } = this.props;

    const matches: $TsFixMe = [];

    if (!value) return matches;

    const isVerseKeySearch = verseRegex.test(value);

    if (isVerseKeySearch) {
      const captures = value.match(verseRegex);

      if (captures) {
        const chapterId = captures[1];
        const ayahNum = captures[2];
        const chapter = chapters[chapterId];

        matches.push([
          chapter.nameSimple,
          chapter.chapterNumber + (ayahNum ? `/${ayahNum}` : ''),
        ]);
      }
    } else if (value.length >= 2) {
      const escaped = value.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

      Object.keys(chapters).forEach(chapterId => {
        const chapter = chapters[chapterId];

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
      .map((match: Array<string>) => ({
        text: `<b>${match[0]}</b>`,
        href: `/${match[1]}`,
      }))
      .slice(0, 5);
  };

  render() {
    return (
      <Container className={!this.getSuggestions().length ? 'hidden' : ''}>
        <List role="menu">
          {!!this.getSuggestions().length &&
            this.getSuggestions().map((item: SuggestionShape) => (
              <li key={item.href}>
                <StyledLink>
                  <a href={item.href}>{item.ayah}</a>
                </StyledLink>
                <div className="text">
                  <a
                    href={item.href}
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
              </li>
            ))}
        </List>
      </Container>
    );
  }
}

export default SearchAutocomplete;
