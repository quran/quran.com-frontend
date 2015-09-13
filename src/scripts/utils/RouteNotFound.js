class RouteNotFound extends Error{
  constructor(url) {
    super();
    this.statusCode = 404;
    this.message = `Url '${url}' does not match any routes`;
    this.stackTraceLimit = 20;

    Error.captureStackTrace(this);
  }
}


export default RouteNotFound;
