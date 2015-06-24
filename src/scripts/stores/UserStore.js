import BaseStore from 'fluxible/addons/BaseStore';
import reactCookie from 'react-cookie';

class UserStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);

    this.options = {};

    let notNan = !Number.isNaN(parseInt(reactCookie.load('quran'))),
        isNumber = Number.isInteger(parseInt(reactCookie.load('quran')));

    if (notNan && isNumber) {
      if (!Array.isArray(reactCookie.load('content'))) {
        let content = reactCookie.load('content');
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

      this.options.quran = parseInt(reactCookie.load('quran'));
      this.options.audio = parseInt(reactCookie.load('audio'));
    }
    else {
      this.options = {
        content: [19],
        audio: 8,
        quran: 1
      };
    }

    if (reactCookie.load('lastVisit')) {
      var data = reactCookie.load('lastVisit').replace(/\"/g, '').split('-').map(function(option) {
        return parseInt(option);
      });

      this.lastVisit = {
        surah: data[0],
        ayah: data[1]
      }
    }
  }

  getLastVisit() {
    return this.lastVisit || false;
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
    var data = expressCookies.lastVisit.replace(/\"/g, '').split('-').map(function(option) {
      return parseInt(option);
    });

    this.options = {
      content: expressCookies.content.replace(/\"/g, '').split(',').map(function(option) {
        return parseInt(option);
      }),
      quran: parseInt(expressCookies.quran),
      audio: parseInt(expressCookies.audio),
    };

    this.lastVisit = {surah: data[0], ayah: data[1]}

  },
  lastVisit(payload) {
    reactCookie.save('lastVisit', `${payload.surah}-${payload.ayah}`);
  }
};

UserStore.storeName = 'UserStore';

export default UserStore;
