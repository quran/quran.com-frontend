import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(
  state => ({
    fontFaces: [].concat(state.ayahs.fontFaces, state.searchResults.fontFaces)
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
