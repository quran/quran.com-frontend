import BaseStore from 'fluxible/addons/BaseStore';
import debug from 'utils/Debug';

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
  }

  _surahsReceived(data) {
    debug('STORES-SURAHS RECEIVED');
    this.surahs = data.surahs;

    if (data.surah) {
      this.surah = this.surahs[data.surah - 1];
    }

    this.emitChange();
  }

  _currentSurahChange(payload, name) {
    debug('STORES-CURRENT SURAH');
    if (this.dispatcher.getStore('RouteStore')._currentRoute.get('name') === 'surah') {
      this.surah = this.surahs[this.dispatcher.getStore('RouteStore')._currentRoute.get('params').get('surahId') - 1];
      this.emitChange();
    }
  }

  getSurahs() {
    return this.surahs;
  }

  hasAllSurahs() {
    return this.surahs.length === 114;
  }

  getSurah() {
    return this.surah;
  }

  getSurahId() {
    return this.surah.id;
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
  'surahsReceived': '_surahsReceived',
  'NAVIGATE_START': '_currentSurahChange'
};

export default SurahsStore;
