import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { fontFaceStyle } from '../../helpers/buildFontFaces';

const bismillah = `@font-face {font-family: 'bismillah';
  src: url('http://quran-1f14.kxcdn.com/fonts/ttf/bismillah.ttf') format('truetype')}
  .bismillah{font-family: 'bismillah'; font-size: 36px !important; color: #000; padding: 25px 0px;}`; // eslint-disable-line

class FontStyle extends Component {
  static propTypes = {
    fontClass: PropTypes.string.isRequired
  }

  static defaultProps = {
    fontClass: ''
  }

  componentDidMount() {
    const { fontClassName } = this.props;
    const FontFaceObserver = require('fontfaceobserver');
    const font = new FontFaceObserver(fontClassName);

    font.load().then(() => {
      console.log(`${fontClassName} is available`);
    });
  }

  render() {
    const { fontClassName } = this.props;

    return <style dangerouslySetInnerHTML={{__html: fontFaceStyle(fontClassName)}} />;
  }
}

@connect(
  state => ({
    ayahs: {
      ...state.ayahs.fontFaces,
      ...state.searchResults.fontFaces
    }
  })
)
export default class FontStyles extends Component {
  static propTypes = {
    ayahs: PropTypes.object.isRequired
  };

  render() {
    const { ayahs } = this.props;
    const fontClassNames = Array.from(new Set(Object.keys(ayahs).map(ayahId => `p${ayahs[ayahId].pageNum}`)));

    return (
      <div>
        <style dangerouslySetInnerHTML={{__html: bismillah}} />
        {fontClassNames.map(fontClassName => <FontStyle key={fontClassName} fontClassName={fontClassName} />)}
      </div>
    );
  }
}
