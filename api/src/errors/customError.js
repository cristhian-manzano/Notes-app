class ApiError extends Error {
  constructor(message, httpCode) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name; // good practice

    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}

module.exports = ApiError;
