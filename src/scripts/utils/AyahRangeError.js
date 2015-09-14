class AyahRangeError extends Error{
  constructor(url) {
    super();
    this.statusCode = 405;
    this.message = `Sorry but we are unable to fetch ayahs with the range you requested. Try having a difference less than 50 eg. /2/1-30.`;
    this.stackTraceLimit = 20;

    Error.captureStackTrace(this);
  }
}


export default AyahRangeError;
