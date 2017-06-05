import React, { PropTypes, Component } from 'react';
import * as customPropTypes from 'customPropTypes';
import * as OptionsActions from 'redux/actions/options.js';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import Link from 'react-router/lib/Link';
import Menu from 'quran-components/lib/Menu';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import ReadingModeToggle from 'components/ReadingModeToggle';
import NightModeToggle from 'components/NightModeToggle';
import InformationToggle from 'components/InformationToggle';
import FontSizeDropdown from 'components/FontSizeDropdown';
import ReciterDropdown from 'components/ReciterDropdown';
import ContentDropdown from 'components/ContentDropdown';
import TooltipDropdown from 'components/TooltipDropdown';
import LocaleSwitcher from 'components/LocaleSwitcher';

import { load  } from 'redux/actions/verses.js';


class Settings extends Component {
  handleOptionChange = (payload) => {
    const { chapter, setOption, options, versesIds } = this.props;

    setOption(payload);

    if (chapter) {
      const from = [...versesIds][0];
      const to = [...versesIds][[...versesIds].length - 1];
      const paging = { offset: from - 1, limit: to - from + 1 };
      this.props.load(chapter.chapterNumber, paging, {
        ...options,
        ...payload
      });
    }
  };

  handleDrawerToggle = (open) => {
    this.setState({ drawerOpen: open });
  };

  renderDrawerToggle(visibleXs) {
    return (
      <li>
        <a
          tabIndex="-1"
          className={`pointer ${visibleXs && 'visible-xs visible-sm'}`}
          onClick={() => this.handleDrawerToggle(true)}
        >
          <i className="ss-icon ss-settings text-align" />
          <LocaleFormattedMessage
            id="setting.title"
            defaultMessage="Settings"
          />
        </a>
      </li>
    );
  }

  render() {
    const {
      chapter,
      chapters,
      setOption,
      versesIds,
      options,
      ...props
    } = this.props;

    return (

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
              <hr />
              <ReciterDropdown onOptionChange={this.handleOptionChange} />
              <ContentDropdown onOptionChange={this.handleOptionChange} />
              <TooltipDropdown
                tooltip={options.tooltip}
                onOptionChange={setOption}
              />
              <hr />
              <div className={styles.title}>
                <LocaleFormattedMessage
                  id="setting.fontSize"
                  defaultMessage="Font Size"
                />
              </div>
              <FontSizeDropdown
                fontSize={options.fontSize}
                onOptionChange={setOption}
              />
            </Menu>
    );
  }
}

Settings.propTypes = {
  setOption: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    options: state.options
  };
}

export default connect(mapStateToProps, {
  ...OptionsActions,
  load,
})(Settings);
