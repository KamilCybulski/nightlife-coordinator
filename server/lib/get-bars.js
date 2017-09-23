const axios = require('axios');

module.exports = (token, location) => {
  const options = {
    method: 'get',
    url: `https://api.yelp.com/v3/businesses/search?location=${location}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios(options)
    .then(res => res.data.businesses)
    .catch(err => err.message);
};
