const loadeddata = new Event('loadeddata');
const timeupdate = new Event('timeupdate');
const ended = new Event('ended');
const play = new Event('play');
const pause = new Event('pause');

export default class AudioStub {
  constructor(url, time) {
    this.element = document.createElement('div');

    this.element.currentSrc = url;
    this.element.currentTime = 0;
    this.element.duration = time || 1000;
    this.element.state = 'paused';

    setTimeout(() => {
      this.element.dispatchEvent(loadeddata);
    }, 500);

    this.element.play = () => {
      this.element.state = 'playing';
      this.element.dispatchEvent(play);
      this.incrementTime();
    };

    this.element.pause = () => {
      this.element.state = 'paused';
      this.element.dispatchEvent(pause);
      clearInterval(this.incrementTime());
    };

    return this.element;
  }

  incrementTime() {
    return setInterval(() => {
      this.element.currentTime = this.element.currentTime + 100;
      this.element.dispatchEvent(timeupdate);

      if (this.element.currentTime === 1000) {
        this.element.pause();
        this.element.dispatchEvent(ended);
      }
    }, 100);
  }

  paused() {
    return this.element.state === 'paused';
  }
}
