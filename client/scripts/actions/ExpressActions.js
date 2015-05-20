export function userAgent(actionContext, userAgent, done) {
  actionContext.dispatch('userAgentReceived', userAgent);
  done();
}
