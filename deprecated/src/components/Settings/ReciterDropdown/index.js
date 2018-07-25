import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as customPropTypes from 'customPropTypes';
import { connect } from 'react-redux';
import Menu, { MenuItem } from 'quran-components/lib/Menu';
import Radio from 'quran-components/lib/Radio';
import Loader from 'quran-components/lib/Loader';
import Icon from 'quran-components/lib/Icon';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import { loadRecitations } from 'redux/actions/options';

const LoaderStyle = { position: 'relative', overflow: 'hidden' };

class ReciterDropdown extends Component {
  componentDidMount() {
    if (!this.props.recitations.length) {
      return this.props.loadRecitations();
    }

    return false;
  }

  renderMenu() {
    const {
      audio,
      onOptionChange,
      recitations,
      loadingRecitations
    } = this.props;

    if (loadingRecitations) {
      return <Loader isActive relative style={LoaderStyle} />;
    }

    return recitations.map(slug => (
      <MenuItem key={slug.id}>
        <Radio
          checked={slug.id === audio}
          id={`slug-${slug.id}`}
          name="reciter"
          handleChange={() => onOptionChange({ audio: slug.id })}
        >
          <span>
            {slug.reciterNameEng} {slug.style ? `(${slug.style})` : ''}
          </span>
        </Radio>
      </MenuItem>
    ));
  }

  render() {
    return (
      <MenuItem
        icon={<Icon type="mic" />}
        menu={<Menu>{this.renderMenu()}</Menu>}
      >
        <LocaleFormattedMessage
          id="setting.reciters.title"
          default="Reciters"
        />
      </MenuItem>
    );
  }
}

ReciterDropdown.propTypes = {
  onOptionChange: PropTypes.func,
  audio: PropTypes.number,
  loadRecitations: PropTypes.func.isRequired,
  recitations: customPropTypes.recitations,
  loadingRecitations: PropTypes.bool
};

export default connect(
  state => ({
    recitations: state.options.options.recitations,
    loadingRecitations: state.options.loadingRecitations,
    audio: state.options.audio
  }),
  { loadRecitations }
)(ReciterDropdown);
