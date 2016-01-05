import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const bismillah = `@font-face {font-family: 'bismillah';
  src: url('http://quran-1f14.kxcdn.com/fonts/ttf/bismillah.ttf') format('truetype')}
  .bismillah{font-family: 'bismillah'; font-size: 36px !important; color: #000; padding-top: 25px;}`;

@connect(
  state => ({
    fontFaces: [].concat(state.ayahs.fontFaces, state.searchResults.fontFaces, [bismillah])
  })
)
export default class FontStyles extends Component {
  static propTypes = {
    fontFaces: PropTypes.array
  }

  render() {
    return (
      <style dangerouslySetInnerHTML={{__html: this.props.fontFaces.join('\n')}} />
    );
  }
}
