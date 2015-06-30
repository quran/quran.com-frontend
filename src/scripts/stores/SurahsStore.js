/* eslint-disable no-underscore-dangle, camelcase */

import BaseStore from 'fluxible/addons/BaseStore';
import debug from 'utils/Debug';
import wikiLinks from 'constants/QuranWikiTitles';

class SurahsStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.surahs = [];
    this.surah = {
      page: null,
      revelation: {
        order: null,
        place: null
      },
      name: {
        arabic: null,
        simple: null,
        complex: null,
        english: null
      },
      ayat: 0,
      bismillah_pre:
      false,
      id: 0
    };

    this.wikiLinks = wikiLinks;
    this.isShowingInfo = false;
  }

  getSurahs() {
    return this.surahs;
  }

  hasAllSurahs() {
    return this.surahs.length === 114;
  }

  getIsShowingInfo() {
    return this.isShowingInfo;
  }

  getSurah() {
    return this.surah;
  }

  getSurahId() {
    return this.surah.id;
  }

  getCurrentSurah() {
    return this.surah;
  }

  getCurrentSurahId() {
    return this.surah.id;
  }

  getWikiLinks() {
    return this.wikiLinks;
  }

  dehydrate() {
    return {
      surahs: this.surahs,
      surah: this.surah
    };
  }
  rehydrate(state) {
    this.surahs = state.surahs;
    this.surah = state.surah;
  }
}

SurahsStore.storeName = 'SurahsStore';
SurahsStore.handlers = {
  surahsReceived(data) {
    debug('STORES-SURAHS RECEIVED');
    this.surahs = data.surahs;

    if (data.surah) {
      this.surah = this.surahs[data.surah - 1];
    }

    this.emitChange();
  },

  'NAVIGATE_START': function(payload, name) {
    var currentRoute = this.dispatcher.getStore('RouteStore').getCurrentRoute();

    if (currentRoute.get('name') === 'surah') {
      this.surah = this.surahs[currentRoute.get('params').get('surahId') - 1];
      this.emitChange();
    }
  },

  showInfo() {
    this.isShowingInfo = !this.isShowingInfo;
    this.emitChange();
  }
};

export default SurahsStore;
