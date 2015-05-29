'use strict';
import React from 'react';
import Ayah from 'components/surah/Ayah';
import AyahsStore from 'stores/AyahsStore';
import Loader from 'components/Loader';
import * as Font from 'utils/FontFace';
import { connectToStores, provideContext } from 'fluxible/addons';
import debug from 'utils/Debug';

class AyahsList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  list() {
    if (this.props.ayahs.length === 0) {
        return <Loader />;
    }

    return this.props.ayahs.map((ayah) => {
        return <Ayah ayah={ayah}
                     key={ayah.ayah + 'ayah'}
                     readingMode={this.props.isReadingMode} />;
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props.ayahs.length, nextProps.ayahs.length)
    return (this.props.ayahs.length === nextProps.ayahs.length) ||
           (this.props.isReadingMode !== nextProps.isReadingMode);
  }

  render() {
    debug('COMPONENT-AYAHSLIST')
    if (this.props.isReadingMode) {
      return (
        <h1 className="word-font text-right">
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
  return {
    ayahs: stores.AyahsStore.getAyahs(),
    isReadingMode: stores.AyahsStore.isReadingMode()
  }
});

export default AyahsList;
