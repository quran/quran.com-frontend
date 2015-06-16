export function userAgent(actionContext, userAgent, done) {
  actionContext.dispatch('userAgentReceived', userAgent);
  done();
}

export function cookies(actionContext, cookies, done) {
  actionContext.dispatch('cookiesReceived', cookies);
  done();
}
