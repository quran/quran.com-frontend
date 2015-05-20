import BaseStore from 'fluxible/addons/BaseStore';

class AudioplayerStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.currentAyah = 1;
  }
  getCurrentAyah() {
      return this.currentAyah;
  }

  shouldPlay() {
      return this.shouldPlay;
  }
}

export default AudioplayerStore;
