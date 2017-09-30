const axios = require('axios');
const qs = require('querystring');
const Bar = require('../models/bar');

const insertAttendants = (places, attendants) => places.map(place => ({
  id: place.id,
  name: place.name,
  rating: place.rating,
  attendants_number: attendants[place.id],
}));

const arrayToObject = arr => arr.reduce((obj, item) =>
  Object.assign({ [item.id]: item.attendants_number }, obj), {});

const getAttendants = (places) => {
  const query = places.map(place => ({ id: place.id }));
  return Bar.find({ $or: query }, { _id: 0 });
};

const getBars = (token, location) => {
  const options = {
    method: 'get',
    url: `https://api.yelp.com/v3/businesses/search?location=${location}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios(options)
    .then(res => res.data.businesses)
    .catch(() => null);
};

const getYelpToken = (clientId, clientSecret) =>
  axios.post('https://api.yelp.com/oauth2/token', qs.stringify({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  }))
    .then(res => res.data.access_token)
    .catch(() => null);

let yelpToken;

module.exports = async (location) => {
  const id = process.env.YELP_CLIENT_ID;
  const secret = process.env.YELP_CLIENT_SECRET;
  const token = yelpToken || await getYelpToken(id, secret);

  if (!yelpToken && token) yelpToken = token;
  if (!token) return { error: 'No yelp token' };

  const bars = await getBars(token, location);
  if (!bars) return { error: 'Cannot connect to yelp API' };

  const attendantsArr = await getAttendants(bars);
  if (!attendantsArr) return { error: 'Cannot connect to the DB' };

  const data = insertAttendants(bars, arrayToObject(attendantsArr));
  return data;
};
