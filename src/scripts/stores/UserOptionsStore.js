import BaseStore from 'fluxible/addons/BaseStore';
import cookie from 'react-cookie';

class UserOptionsStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);

    this.options = {};

    let notNan = !Number.isNaN(parseInt(cookie.load('quran'))),
        isNumber = Number.isInteger(parseInt(cookie.load('quran')));

    if (notNan && isNumber) {
      if (!Array.isArray(cookie.load('content'))) {
        let content = cookie.load('content');
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

      this.options.quran = parseInt(cookie.load('quran'));
      this.options.audio = parseInt(cookie.load('audio'));
    }
    else {
      this.options = {
          content: [21],
          audio: 1,
          quran: 1
      };
      cookie.save('quran', this.options.quran);
      cookie.save('content', this.options.content.toString());
      cookie.save('audio', this.options.audio);
    }
  }

  getOptions() {
    return this.options;
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
      cookie.save(key, value.join());
      this.options[key] = value;
    } else {
      cookie.save(key, value);
      this.options[key] = value;
    }
  }

  clearOptions() {
    this.options = {};

    cookie.remove('quran');
    cookie.remove('content');
    cookie.remove('audio');
  }
}

UserOptionsStore.storeName = 'UserOptionsStore';

export default UserOptionsStore;
