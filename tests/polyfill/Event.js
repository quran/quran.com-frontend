// https://github.com/Raynos/DOM-shim/blob/master/src/all/interfaces/Event.js

if (typeof window.Event !== 'function') {
  window.Event = function constructor(type, dict) {
    let event = document.createEvent('Events');
    dict = dict || {};
    dict.bubbles = dict.bubbles || false;
    dict.catchable = dict.catchable || false;
    event.initEvent(type, dict.bubbles, dict.catchable);
    return event;
  };
}
