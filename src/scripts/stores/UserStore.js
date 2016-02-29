import BaseStore from 'fluxible/addons/BaseStore';
import reactCookie from 'react-cookie';
import * as Settings from 'constants/Settings';

class UserStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);

    this.options = {};

    this.version = Settings.version;

    // TODO: Research if we need these anymore or can get rid of them!
    // this.setLastVisit(reactCookie.load('lastVisit'));
    //
    // this.setIsFirstTime(reactCookie.load('isFirstTime'));
    //
    // this.setOptionsCookie(
    //   reactCookie.load('quran'),
    //   reactCookie.load('content'),
    //   reactCookie.load('audio')
    // );
    //
    // this.setVersion(reactCookie.load('version'));
  }

  setVersion(cookie) {
    if (cookie) {
      this.version = cookie.replace(/\"/g, '').replace(/\\/g, '');
    }
  }

  getVersion() {
    return this.version;
  }

  getIsCurrentVersion() {
    if (this.getVersion() !== Settings.version) {
      return false;
    }
    else {
      return true;
    }
  }

  setLastVisit(cookie) {
    if (cookie) {
      var data = cookie.replace(/\"/g, '').split('-').map(function(option) {
        return parseInt(option);
      });

      this.lastVisit = {
        surah: data[0],
        ayah: data[1]
      };
    }
  }

  getLastVisit() {
    return this.lastVisit || false;
  }

  setIsFirstTime(cookie) {
    if (cookie === undefined) {
      this.isFirstTime = true;
    }
    else {
      this.isFirstTime = false;
    }
  }

  getIsFirstTime() {
    return this.isFirstTime;
  }

  setOptionsCookie(quranCookie, contentCookie, audioCookie) {
    this.options = {
      quran: quranCookie ? quranCookie : 1,
      content: contentCookie ? contentCookie : [19],
      audio: audioCookie ? parseInt(audioCookie) : 8
    };

    if (!Array.isArray(contentCookie)) {
      let content = contentCookie;

      if (Number.isInteger(content)) {
        this.options.content = [content];
      }
      else {
        this.options.content = content.replace(/\"/g, '').split(',').map(function(option) {
          return parseInt(option);
        });
      }
    }
    else {
      this.options.content = [19];
    }

    if (quranCookie) {
      this.options.quran = parseInt(quranCookie);
    }
    else {
      this.options.quran = 1;
    }

    if (audioCookie) {
      this.options.audio = parseInt(audioCookie);
    }
    else {
      this.options.audio = 8;
    }
  }

  getOptions() {
    return {
      audio: this.options.audio,
      quran: this.options.quran,
      content: this.options.content.join(',')
    };
  }

  getQuranOptions() {
    return this.options.quran;
  }

  getContentOptions() {
    return this.options.content;
  }

  getAudioOptions() {
    return this.options.audio;
  }

  setOptions(obj) {
    var self, value, results;
    self = this;
    results = [];
    for (var key in obj) {
      value = obj[key];
      results.push(self.setSingleOption(key, value));
    }
    return results;
  }

  setSingleOption(key, value) {
    if (key === 'content') {
      reactCookie.save(key, value.join());
      this.options[key] = value;
    } else {
      reactCookie.save(key, value);
      this.options[key] = value;
    }
  }

  clearOptions() {
    this.options = {};

    reactCookie.remove('quran');
    reactCookie.remove('content');
    reactCookie.remove('audio');
  }

  dehydrate() {
    return {
      options: this.options,
      lastVisit: this.lastVisit,
      isFirstTime: this.isFirstTime,
      version: this.version
    };
  }

  rehydrate(state) {
    this.options = state.options;
    this.lastVisit = state.lastVisit;
    this.isFirstTime = state.isFirstTime;
    this.version = state.version;

    // TODO: Don't call this everytime.
    if (reactCookie.load('isFirstTime') !== state.isFirstTime) {
      reactCookie.save('isFirstTime', state.isFirstTime);
    }

    if (reactCookie.load('version') !== state.version) {
      reactCookie.save('version', state.version.replace(/\"/g, '').replace(/\\/g, ''));
    }
  }

  shouldDehydrate() {
    return true;
  }

  cookiesReceived(expressCookies) {
    this.setLastVisit(expressCookies.lastVisit);
    this.setIsFirstTime(expressCookies.isFirstTime);

    this.setOptionsCookie(
      expressCookies.quran,
      expressCookies.content,
      expressCookies.audio
    );

    this.setVersion(expressCookies.version);
  }

  lastVisitReceived(payload) {
    this.lastVisit = {surah: payload.surah, ayah: payload.ayah};

    reactCookie.save('lastVisit', `${payload.surah}-${payload.ayah}`);
  }
}

UserStore.handlers = {
  cookiesReceived: 'cookiesReceived',
  lastVisit: 'lastVisitReceived'
};

UserStore.storeName = 'UserStore';

export default UserStore;
