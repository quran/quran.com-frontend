import i from 'i';

const inflect = i();
const CLICK = 'click';

interface Config {
  [CLICK]: Array<string>;
  [key: string]: $TsFixMe;
}

// events
// The goal for developers is to have them call
// FOOTER.CLICK.AUDIO;
// and returns
// { NAME: 'Footer', ACTION: 'Click', LABEL: 'Audio' }
const makeObject = (name: string, action: string, labels: Array<string>) => {
  const obj: { [key: string]: $TsFixMe } = {};
  const actionObj: { [key: string]: $TsFixMe } = {};

  labels.forEach(label => {
    const LABEL = inflect.titleize(label);
    const ACTION = inflect.titleize(action);
    const NAME = inflect.titleize(name);

    actionObj[label.replace(/ /g, '_').toUpperCase()] = {
      LABEL,
      ACTION,
      NAME,
      PROPS: {
        'data-metrics-event-label': LABEL,
        'data-metrics-event-action': ACTION,
        'data-metrics-event-name': NAME,
      },
    };
  });

  obj[action.toUpperCase()] = actionObj;

  return obj;
};

const makeConfig = (name: string, config: Config) =>
  Object.keys(config).reduce(
    (obj, key) => ({
      ...obj,
      ...makeObject(name, key, config[key]),
    }),
    {}
  );

const EXTERNAL_LINKS = {
  [CLICK]: [
    'quranicaudio link',
    'corpus link',
    'salah link',
    'sunnah link',
    'developers link',
    'legacy link',
    'blog link',
    'chapter link',
    'donations link',
    'help link',
  ],
};

const INTERNAL_LINKS: { [key: string]: $TsFixMe } = {
  [CLICK]: ['apps link', 'home link', 'sitemap link', 'profile link'],
};

export const FOOTER_EVENTS: { [key: string]: $TsFixMe } = makeConfig('footer', {
  [CLICK]: [...EXTERNAL_LINKS[CLICK], ...INTERNAL_LINKS[CLICK]],
});

export const SIDEBAR_EVENTS: { [key: string]: $TsFixMe } = makeConfig(
  'sidebar',
  {
    [CLICK]: [...EXTERNAL_LINKS[CLICK], ...INTERNAL_LINKS[CLICK]],
  }
);

export const NAVBAR_EVENTS: { [key: string]: $TsFixMe } = makeConfig('navbar', {
  [CLICK]: [
    ...EXTERNAL_LINKS[CLICK],
    ...INTERNAL_LINKS[CLICK],
    'sidebar toggle',
    'locale switcher toggle',
  ],
});

export const SITES_EVENTS: { [key: string]: $TsFixMe } = makeConfig('sites', {
  [CLICK]: [...EXTERNAL_LINKS[CLICK], ...INTERNAL_LINKS[CLICK]],
});

export const COPY_EVENTS: { [key: string]: $TsFixMe } = makeConfig('copy', {
  [CLICK]: ['verse'],
});

export const QUICK_LINKS_EVENTS: { [key: string]: $TsFixMe } = makeConfig(
  'quick links',
  {
    [CLICK]: ['verse', 'chapter'],
  }
);

export const CHAPTERS_LIST_EVENTS: { [key: string]: $TsFixMe } = makeConfig(
  'chapters list',
  {
    [CLICK]: ['chapter link'],
  }
);

export const JUZ_LIST_EVENTS: { [key: string]: $TsFixMe } = makeConfig(
  'juz list',
  {
    [CLICK]: ['juz link'],
  }
);
