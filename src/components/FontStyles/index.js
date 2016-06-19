import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
<<<<<<< c650ed7eec6a12cde34833a9f51932caccbe837a
<<<<<<< e5e90d6d4affdf061a6807d3101cb4cf8eb110af
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

import { fontFaceStyle, fontFaceStyleLoaded } from '../../helpers/buildFontFaces';
import { load } from 'redux/modules/fontFaces';

import debug from 'helpers/debug';

@connect(
  state => ({
    fontFaces: state.fontFaces
  }),
  { load }
)
export default class FontStyles extends Component {
  static propTypes = {
    fontFaces: PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return this.props.fontFaces !== nextProps.fontFaces;
  }

  render() {
    const { fontFaces, load } = this.props; // eslint-disable-line no-shadow
    console.log(fontFaces);
    debug('component:FontStyles', 'render');

    if (__CLIENT__) {
      const FontFaceObserver = require('fontfaceobserver');

      Object.keys(fontFaces).filter(className => !fontFaces[className]).map(className => {
        const font = new FontFaceObserver(className);

        font.load().then(() => load(className), () => load(className));
      });
    }

    return (
      <div>
        {
          Object.keys(fontFaces).map(className => (
            <style
              key={className}
              dangerouslySetInnerHTML={{
                __html: fontFaces[className] ? `${fontFaceStyle(className)} ${fontFaceStyleLoaded(className)}` : fontFaceStyle(className)
              }}
            />
          ))
        }
      </div>
    );
  }
}
