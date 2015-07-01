export function userAgent(actionContext, userAgentPayload, done) {
  actionContext.dispatch('userAgentReceived', userAgentPayload);
  done();
}

export function cookies(actionContext, cookiesPayload, done) {
  actionContext.dispatch('cookiesReceived', cookiesPayload);
  done();
}
