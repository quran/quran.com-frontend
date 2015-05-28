import BaseStore from 'fluxible/addons/BaseStore';

class AudioplayerStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);

    this.shouldPlay = false;
    this.currentAyah = this.dispatcher.getStore('AyahsStore').getAyahs()[0];
    this.currentAudio = this.currentAyah.scopedAudio;
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
}

AudioplayerStore.handlers = {
  audioplayerAyahChange(payload) {
    console.log('Audioplayer reached')
    this.currentAyah = this.dispatcher.getStore('AyahsStore').getAyahs().find((ayah) => {
      return ayah.ayah === payload.ayah;
    });

    this.currentAudio = this.currentAyah.scopedAudio;

    this.shouldPlay = payload.shouldPlay;

    this.emitChange();
  }
}

export default AudioplayerStore;
