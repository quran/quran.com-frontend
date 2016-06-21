export default {
  pageViewEvent: 'pageLoad',
  vendors: [
    {
      api: {
        name: 'Segment',
        pageView() {
          return ga('send', 'pageview');
        },
        track(eventName, params) {
          return ga('send', {
            hitType: 'event',
            eventCategory: eventName,
            eventAction: params.action || 'click',
            eventLabel: params.label || 'Interactions'
          });
        },
        user(user) {
          return new Promise(resolve => {
            resolve({
              user
            });
          });
        }
      }
    }
  ]
};
