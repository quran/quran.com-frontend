/* eslint-disable indent */
import $ from 'jquery';

export default function(elem, options) {
  elem = $(elem).find('.line');

  const settings = $.extend({
    maximum   : 1680,
    minimum   : 400,
    maxFont   : 70,
    minFont   : 1,
    fontRatio : 20
  }, options),

  changes = function(el) {
    const $el = $(el);
    const elw = $el.width();
    const width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw;
    const fontBase = width / settings.fontRatio;
    const fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;

    $el.css('font-size', fontSize + 'px');
  };

  // Context for resize callback
  // Make changes upon resize
  $(window).resize(function(){
    changes(elem);
  });
  // Set changes on load
  changes(elem);
};
