import BaseStore from 'fluxible/addons/BaseStore';

class AudioplayerStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);

    this.shouldPlay = false;
    this.currentAyah = this.dispatcher.getStore('AyahsStore').getAyahs()[0];

    if (this.currentAyah) {
      this.currentAudio = this.currentAyah.scopedAudio;
    }
  };

  getCurrentAudio() {
    return this.currentAudio;
  };

  getCurrentAyah() {
    return this.currentAyah;
  };

  getShouldPlay() {
    return this.shouldPlay;
  };

  dehydrate() {
    return {
      currentAyah: this.currentAyah,
      currentAudio: this.currentAudio
    }
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
    console.log('Audioplayer reached');

    this.currentAyah = this.dispatcher.getStore('AyahsStore').getAyahs().find((ayah) => {
      return ayah.ayah === payload.ayah;
    });

    this.currentAudio = this.currentAyah.scopedAudio;
    this.shouldPlay = payload.shouldPlay;

    this.emitChange();
  },

  ayahsReceived() {
    this.dispatcher.waitFor('AyahsStore', () => {
      console.log(this.currentAyah)
      if (!this.currentAyah) {
        this.shouldPlay = false;
        this.currentAyah = this.dispatcher.getStore('AyahsStore').getAyahs()[0];

        if (this.currentAyah) {
          this.currentAudio = this.currentAyah.scopedAudio;
          console.log(this.currentAudio)
        }
      }
      this.emitChange();
    });
  }
};

AudioplayerStore.storeName = 'AudioplayerStore';

export default AudioplayerStore;
