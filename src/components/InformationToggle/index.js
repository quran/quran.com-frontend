import React, { Component, PropTypes } from 'react';

export default class InformationToggle extends Component {
  static propTypes = {
    isShowingSurahInfo: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
  };

  toggleInformationMode = (event) => {
    const { isShowingSurahInfo } = this.props;

    event.preventDefault();

    this.props.onToggle({isShowingSurahInfo: !isShowingSurahInfo});
  };

  render() {
    const { isShowingSurahInfo } = this.props;

    return (
      <a
        title="See information for this surah"
        className={`${isShowingSurahInfo ? ' text-primary' : 'text-color'} pointer`}
        onClick={this.toggleInformationMode}
      >
        Surah Info
      </a>
    );
  }
}
