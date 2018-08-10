/* global window */
type Params = {
  action?: string;
  label?: string;
  eventAction?: string;
  eventLabel?: string;
};
const DEFAULT_PARAMS: Params = {
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
          window.mixpanel.track('Pageview', window.location);

          return window.ga('send', 'pageview');
        },
        track(eventCategory: string, params = DEFAULT_PARAMS) {
          window.mixpanel.track(eventCategory, params);

          const { eventAction, eventLabel } = params;

          return window.ga('send', {
            hitType: 'event',
            eventCategory,
            eventAction,
            eventLabel,
          });
        },
        // user(user) {
        //   return new Promise(resolve => {
        //     resolve({
        //       user,
        //     });
        //   });
        // },
      },
    },
  ],
};
