'use strict';
import React from 'react';
import Ayah from 'components/surah/Ayah';
import AyahsStore from 'stores/AyahsStore';
import Loader from 'components/Loader';
import * as Font from 'utils/FontFace';
import { connectToStores, provideContext } from 'fluxible/addons';

class AyahsList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      readingMode: false,
      fontSize: this.context.getStore(AyahsStore).getFontSize()
    };
  }

  _list() {
    if (this.props.ayahs.length === 0) {
        return <Loader />;
    }

    return this.props.ayahs.map((ayah) => {
        return <Ayah ayah={ayah}
                     key={ayah.ayah + 'ayah'}
                     readingMode={this.state.readingMode}
                     fontSize={this.state.fontSize} />;
    });
  }

  render() {
    if (this.state.readingMode) {
      return (
        <h1 className="word-font text-right" style={{fontSize: this.state.fontSize}}>
            {this._list()}
        </h1>
      );
    }

    return (
      <div>
          {this._list()}
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
    ayahs: stores.AyahsStore.getAyahs()
  }
});

export default AyahsList;
