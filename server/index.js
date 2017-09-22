const express = require('express');
const path = require('path');

const getYelpToken = require('./lib/get-yelp-token');

const staticFile = express.static('client/build/');
const app = express();
app.use(staticFile);


let yelpToken;

app.get('/api/places', async (req, res) => {
  const id = process.env.YELP_CLIENT_ID;
  const secret = process.env.YELP_CLIENT_SECRET;
  const token = yelpToken || await getYelpToken(id, secret);

  if (!yelpToken) {
    yelpToken = token;
  }

  if (token) {
    res.json({ token });
  } else {
    res.json({ error: 'No yelp token' });
  }
});


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(process.env.PORT || 3001);

