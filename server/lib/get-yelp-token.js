const axios = require('axios');
const qs = require('querystring');

module.exports = (clientId, clientSecret) =>
  axios.post('https://api.yelp.com/oauth2/token', qs.stringify({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  }))
    .then(res => res.data.access_token)
    .catch(() => null);
