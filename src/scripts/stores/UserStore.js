import BaseStore from 'fluxible/addons/BaseStore';
import reactCookie from 'react-cookie';
import * as Settings from 'constants/Settings';

class UserStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);

    this.setLastVisit(reactCookie.load('lastVisit'));

    this.setIsFirstTime(reactCookie.load('isFirstTime'));

    this.setOptionsCookie(
      reactCookie.load('quran'),
      reactCookie.load('content'),
      reactCookie.load('audio')
    );

    this.setVersion(reactCookie.load('version'));
  }

  setVersion(cookie) {
    if (cookie) {
      // TODO: What happens here?!
    }
    else {
      reactCookie.save('version', Settings.version);
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
      reactCookie.save('isFirstTime', true);
    }
    else {
      this.isFirstTime = false;
      reactCookie.save('isFirstTime', false);
    }
  }

  getIsFirstTime() {
    return this.isFirstTime;
  }

  setOptionsCookie(quranCookie, contentCookie, audioCookie) {
    if (!quranCookie && !contentCookie && !audioCookie) {
      this.options = {
        content: [19],
        audio: 8,
        quran: 1
      };
    }
    else {
      this.options = {};

      if (!Array.isArray(contentCookie)) {
        let content = contentCookie;

        if (Number.isInteger(content)) {
          this.options.content = [content];
        }
        else {
          this.options.content = content
              .replace(/\"/g, '').split(',').map(function(option) {
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
  }

  getOptions() {
    console.log(this.options);
    
    return {
      audio: this.options.audio,
      quran: this.options.quran,
      content: this.options.content ? this.options.content.join(',') : [19]
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
    var self, value, _results;
    self = this;
    _results = [];
    for (var key in obj) {
      value = obj[key];
      _results.push(self.setSingleOption(key, value));
    }
    return _results;
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
}

UserStore.handlers = {
  cookiesReceived(expressCookies) {
    this.setLastVisit(expressCookies.lastVisit);
    this.setIsFirstTime(expressCookies.isFirstTime);

    this.setOptionsCookie(
      expressCookies.quran,
      expressCookies.content,
      expressCookies.audio
    );
  },
  lastVisit(payload) {
    reactCookie.save('lastVisit', `${payload.surah}-${payload.ayah}`);
  }
};

UserStore.storeName = 'UserStore';

export default UserStore;
