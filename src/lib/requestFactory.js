const request = require('request-promise');
const config = require('config');

module.exports = (url) => {
  return request.get(url, {
    'auth': {
      'bearer': config.get("auth.bearerToken")
    }
  });
}
