'use strict';
import React from 'react';
import Ayah from 'components/surah/Ayah';
import Line from 'components/surah/Line';
import AyahsStore from 'stores/AyahsStore';
import Loader from 'components/Loader';
import { connectToStores } from 'fluxible/addons';
import debug from 'utils/Debug';

class AyahsList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  list() {
    if (this.props.ayahs.length === 0) {
      return <Loader />;
    }

    if (this.props.isReadingMode) {
      return this.props.lines.map(line => {

        return <Line line={line}/>;
      });
    }

    return this.props.ayahs.map(ayah => {
      return <Ayah ayah={ayah}
                   key={`${ayah.surah_id}-${ayah.ayah}-ayah`}
                   readingMode={this.props.isReadingMode} />;
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.ayahs.length === 0) {
      return true;
    }

    return (this.props.ayahs.length === nextProps.ayahs.length) ||
           (this.props.isReadingMode !== nextProps.isReadingMode);
  }

  resizeReadingMode() {
    if ( this.props.isReadingMode) {
      let elem = $( '.word-font.text-justify' );
      console.log( 'resize!', 'this', this, 'window', window, 'elem', elem );
    }
  }

  componentDidMount() {
    if (typeof window === 'undefined') {
      return;
    }

    var self = this;

    $(window).unbind('resize');
    $(window).bind('resize', () => {
      if (this.props.isReadingMode) {
        console.log('dispatch resizeReadingMode');
        let ev = new Event( 'resizeReadingMode' );
        window.dispatchEvent( ev );
      }
    });

    window.addEventListener( 'resizeReadingMode', (ev) => {
      console.log( 'calling resizeReadingMode' );
      self.resizeReadingMode();
    }, false );
  }

  render() {
    debug('COMPONENT-AYAHSLIST');

    if (this.props.isReadingMode) {
      return (
        <h1 className="word-font text-justify">
            {this.list()}
        </h1>
      );
    }

    return (
      <div>
          {this.list()}
      </div>
    );
  }
}

AyahsList.displayName = 'AyahsList';

AyahsList.contextTypes = {
  getStore: React.PropTypes.func.isRequired
};

AyahsList = connectToStores(AyahsList, [AyahsStore], (stores, props) => {
  console.log( 'ayahs list connect to stores' );

  if (stores.AyahsStore.isReadingMode()) {
    console.log( 'AyahsStore is reading mode', 'window', window );
  }

  return {
    ayahs: stores.AyahsStore.getAyahs(),
    lines: stores.AyahsStore.getLines(),
    isReadingMode: stores.AyahsStore.isReadingMode()
  };
});

export default AyahsList;
