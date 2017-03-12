import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import Loader from 'quran-components/lib/Loader';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import { loadRecitations } from 'redux/actions/options';
import { recitationType } from 'types';

const style = require('./style.scss');

class ReciterDropdown extends Component {
  static propTypes = {
    onOptionChange: PropTypes.func,
    audio: PropTypes.number,
    className: PropTypes.string,
    loadRecitations: PropTypes.func.isRequired,
    recitations: PropTypes.arrayOf(recitationType)
  };

  componentDidMount() {
    return this.props.loadRecitations();
  }

  renderMenu() {
    const { audio, onOptionChange, recitations } = this.props;

    return recitations.map(slug => (
      <MenuItem
        key={slug.id}
        active={slug.id === audio}
        onClick={() => onOptionChange({ audio: slug.id })}
      >
        {slug.reciterNameEng} {slug.style ? `(${slug.style})` : ''}
      </MenuItem>
    ));
  }

  render() {
    const { className, audio, recitations } = this.props;
    const title = recitations.length ?
                  recitations.find(slug => slug.id === audio).reciterNameEng :
                  <LocaleFormattedMessage id="setting.reciters.title" default="Reciters" />;

    return (
      <ButtonToolbar>
        <DropdownButton
          block
          id="reciter-dropdown"
          className={`${className} ${style.dropdown}`}
          title={title}
        >
          {recitations.length ? this.renderMenu() : <Loader isActive />}
        </DropdownButton>
      </ButtonToolbar>
    );
  }
}

export default connect(state => ({
  recitations: state.options.options.recitations,
  loadingRecitations: state.options.loadingRecitations
}), { loadRecitations })(ReciterDropdown);
