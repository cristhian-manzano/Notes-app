const errorResponse = (httpCode, message) => ({ status: httpCode, message });

const successResponse = (httpCode, data) => ({ status: httpCode, data });

module.exports = { errorResponse, successResponse };
