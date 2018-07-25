/* global window */
import debug from '../helpers/debug';

const DEFAULT_PARAMS = {
  action: 'Click',
  label: 'Interactions',
};

export default {
  pageViewEvent: 'pageLoad',
  vendors: [
    {
      api: {
        name: 'Analytics',
        pageView() {
          debug('metrics:pageView', window.location);

          mixpanel.track('Pageview', window.location);

          return ga('send', 'pageview');
        },
        track(eventCategory, params = DEFAULT_PARAMS) {
          debug('metrics:track', { eventCategory, ...params });

          mixpanel.track(eventCategory, params);

          const { eventAction, eventLabel } = params;

          return ga('send', {
            hitType: 'event',
            eventCategory,
            eventAction,
            eventLabel,
          });
        },
        user(user) {
          return new Promise(resolve => {
            resolve({
              user,
            });
          });
        },
      },
    },
  ],
};
