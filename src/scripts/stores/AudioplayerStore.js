import BaseStore from 'fluxible/addons/BaseStore';
import debug from 'utils/Debug';

class AudioplayerStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);

    this.shouldPlay = false;
    this.currentAyah = this.dispatcher.getStore('AyahsStore').getAyahs()[0];

    if (this.currentAyah) {
      this.currentAudio = this.currentAyah.scopedAudio;
    }
  }

  getCurrentAudio() {
    return this.currentAudio;
  }

  getCurrentAyah() {
    return this.currentAyah;
  }

  getShouldPlay() {
    return this.shouldPlay;
  }

  dehydrate() {
    return {
      currentAyah: this.currentAyah,
      currentAudio: this.currentAudio
    };
  }

  rehydrate(state) {
    this.currentAyah = state.currentAyah;
    this.currentAudio = state.currentAudio;
    if (!this.currentAyah.scopedAudio) {
      this.shouldPlay = false;
      this.currentAyah = this.dispatcher.getStore('AyahsStore').getAyahs()[0];

      if (this.currentAyah) {
        this.currentAudio = this.currentAyah.scopedAudio;
      }
    }
  }
}

AudioplayerStore.handlers = {
  audioplayerAyahChange(payload) {
    debug('Audioplayer reached');

    this.currentAyah = this.dispatcher.getStore('AyahsStore').getAyahs().find((ayah) => {
      return ayah.ayah_num === payload.ayah_num;
    });

    if (this.currentAyah) {
      this.currentAudio = this.currentAyah.scopedAudio;
      this.shouldPlay = payload.shouldPlay;

      this.emitChange();
    }
  },

  ayahsReceived() {
    this.dispatcher.waitFor('AyahsStore', () => {
      if (this.currentAyah !== this.dispatcher.getStore('AyahsStore').getAyahs()[0]) {
        this.shouldPlay = false;
        this.currentAyah = this.dispatcher.getStore('AyahsStore').getAyahs()[0];

        if (this.currentAyah) {
          this.currentAudio = this.currentAyah.scopedAudio;
        }
        this.emitChange();
      }
    });
  }
};

AudioplayerStore.storeName = 'AudioplayerStore';

export default AudioplayerStore;
