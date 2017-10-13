import i from 'i';

const inflect = i();

const CLICK = 'click';

const EXTERNAL_LINKS = {
  [CLICK]: [
    'quranicaudio link',
    'corpus link',
    'salah link',
    'sunnah link',
    'developers link',
    'legacy link',
    'chapter link',
    'donations link',
    'help link'
  ]
};

const INTERNAL_LINKS = {
  [CLICK]: ['apps link', 'home link', 'sitemap link', 'profile link']
};

// events
// The goal for developers is to have them call
// FOOTER.CLICK.AUDIO;
// and returns
// { NAME: 'Footer', ACTION: 'Click', LABEL: 'Audio' }
const makeObject = (name, action, labels) => {
  const obj = {};
  const actionObj = {};

  labels.forEach((label) => {
    const LABEL = inflect.titleize(label);
    const ACTION = inflect.titleize(action);
    const NAME = inflect.titleize(name);

    actionObj[label.replace(' ', '_').toUpperCase()] = {
      LABEL,
      ACTION,
      NAME,
      PROPS: {
        'data-metrics-event-label': LABEL,
        'data-metrics-event-action': ACTION,
        'data-metrics-event-name': NAME
      }
    };
  });

  obj[action.toUpperCase()] = actionObj;

  return obj;
};

const makeConfig = (name, config) =>
  Object.keys(config).reduce(
    (obj, key) => ({
      ...obj,
      ...makeObject(name, key, config[key])
    }),
    {}
  );

export const FOOTER_EVENTS = makeConfig('footer', {
  [CLICK]: [...EXTERNAL_LINKS[CLICK], ...INTERNAL_LINKS[CLICK]]
});

export const SIDEBAR_EVENTS = makeConfig('sidebar', {
  [CLICK]: [...EXTERNAL_LINKS[CLICK], ...INTERNAL_LINKS[CLICK]]
});

export const NAVBAR_EVENTS = makeConfig('navbar', {
  [CLICK]: [...EXTERNAL_LINKS[CLICK], ...INTERNAL_LINKS[CLICK]]
});

export const SITES_EVENTS = makeConfig('sites', {
  [CLICK]: [...EXTERNAL_LINKS[CLICK], ...INTERNAL_LINKS[CLICK]]
});

export const COPY_EVENTS = makeConfig('copy', {
  [CLICK]: ['verse']
});

export const QUICK_LINKS_EVENTS = makeConfig('quick links', {
  [CLICK]: ['verse', 'chapter']
});
