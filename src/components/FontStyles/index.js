import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fontFaceStyle, fontFaceStyleLoaded } from 'helpers/buildFontFaces';
import load from 'redux/actions/fontFace.js';

import debug from 'helpers/debug';
import selector from './selector';

@connect(
  state => ({
    fontFaces: selector(state)
  }),
  { load }
)
export default class FontStyles extends Component {
  static propTypes = {
    fontFaces: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props.fontFaces) !== JSON.stringify(nextProps.fontFaces);
  }

  render() {
    const { fontFaces, load } = this.props; // eslint-disable-line no-shadow
    debug('component:FontStyles', 'render');

    if (__CLIENT__) {
      const FontFaceObserver = require('fontfaceobserver'); // eslint-disable-line global-require

      Object.keys(fontFaces).filter(className => !fontFaces[className]).forEach((className) => {
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
                __html: fontFaces[className] ?
                `${fontFaceStyle(className)} ${fontFaceStyleLoaded(className)}` :
                fontFaceStyle(className)
              }}
            />
          ))
        }
      </div>
    );
  }
}
