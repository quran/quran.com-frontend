import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import Drawer from 'quran-components/lib/Drawer';
import Menu, { MenuItem } from 'quran-components/lib/Menu';

import { surahType, optionsType } from 'types';
import * as OptionsActions from 'redux/actions/options.js';

import SearchInput from 'components/SearchInput';
import SurahsDropdown from 'components/SurahsDropdown';
import ReadingModeToggle from 'components/ReadingModeToggle';
import NightModeToggle from 'components/NightModeToggle';
import InformationToggle from 'components/InformationToggle';
import FontSizeDropdown from 'components/FontSizeDropdown';
import ReciterDropdown from 'components/ReciterDropdown';
import ContentDropdown from 'components/ContentDropdown';
import TooltipDropdown from 'components/TooltipDropdown';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
// TODO: import VersesDropdown from 'components/VersesDropdown';

import { load } from 'redux/actions/verses.js';

import GlobalNav from '../index';

class GlobalNavSurah extends Component {
  static propTypes = {
    chapter: surahType.isRequired,
    chapters: PropTypes.objectOf(surahType).isRequired,
    options: optionsType.isRequired,
    setOption: PropTypes.func.isRequired,
    versesIds: PropTypes.instanceOf(Set),
    load: PropTypes.func.isRequired
  };

  state = {
    drawerOpen: false
  }

  handleOptionChange = (payload) => {
    const { chapter, setOption, options, versesIds } = this.props;

    setOption(payload);

    if (chapter) {
      const from = [...versesIds][0];
      const to = [...versesIds][[...versesIds].length - 1];
      const paging = { offset: from - 1, limit: (to - from) + 1 };
      this.props.load(chapter.chapterNumber, paging, { ...options, ...payload });
    }
  };

  handleDrawerToggle = (open) => {
    this.setState({ drawerOpen: open });
  }

  renderDrawerToggle() {
    return (
      <li>
        <a tabIndex="-1" className="pointer" onClick={() => this.handleDrawerToggle(true)}>
          <i className="ss-icon ss-settings text-align" />
          <LocaleFormattedMessage id="setting.title" defaultMessage="Settings" />
        </a>
      </li>
    );
  }

  render() {
    const { chapter, chapters, setOption, options, ...props } = this.props;

    return (
      <GlobalNav
        {...props}
        leftControls={[
          <SurahsDropdown title={chapter.nameSimple} chapters={chapters} />,
          <div className="navbar-form navbar-left hidden-xs hidden-sm">
            <SearchInput className="search-input" />
          </div>,
          <li className="visible-xs-inline-block visible-sm-inline-block">
            <Link to="/search">
              <i className="ss-icon ss-search" style={{ verticalAlign: 'sub' }} />
            </Link>
          </li>
        ]}
        rightControls={[
          this.renderDrawerToggle(),
          <Drawer
            right
            drawerClickClose={false}
            open={this.state.drawerOpen}
            handleOpen={this.handleDrawerToggle}
            toggle={<noscript />}
          >
            <Menu>
              <InformationToggle
                onToggle={setOption}
                isToggled={options.isShowingSurahInfo}
              />
              <ReadingModeToggle
                isToggled={options.isReadingMode}
                onToggle={setOption}
              />
              <NightModeToggle
                isNightMode={options.isNightMode}
                onToggle={setOption}
              />
              <MenuItem divider />
              <FontSizeDropdown
                fontSize={options.fontSize}
                onOptionChange={setOption}
              />
              <MenuItem divider />
              <div style={{ paddingLeft: 15, paddingRight: 15 }}>
                <LocaleFormattedMessage id="setting.reciters.title" defaultMessage="Reciters" />
                <ReciterDropdown
                  onOptionChange={this.handleOptionChange}
                />
                <br />
                <LocaleFormattedMessage id="setting.translations.title" defaultMessage="Translations" />
                <ContentDropdown
                  onOptionChange={this.handleOptionChange}
                />
              </div>
              <MenuItem divider />
              <div style={{ paddingLeft: 15, paddingRight: 15 }}>
                <LocaleFormattedMessage id="setting.tooltip.title" defaultMessage="Tooltip Content" />
              </div>
              <TooltipDropdown
                tooltip={options.tooltip}
                onOptionChange={setOption}
              />
            </Menu>
          </Drawer>
        ]}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const chapterId = parseInt(ownProps.params.chapterId, 10);
  const chapter: Object = state.chapters.entities[chapterId];
  const verses: Object = state.verses.entities[chapterId];
  const versesArray = verses ? Object.keys(verses).map(key => parseInt(key.split(':')[1], 10)) : [];
  const versesIds = new Set(versesArray);

  return {
    chapter,
    chapters: state.chapters.entities,
    options: state.options,
    versesIds
  };
}

export default connect(mapStateToProps, { ...OptionsActions, load })(GlobalNavSurah);
