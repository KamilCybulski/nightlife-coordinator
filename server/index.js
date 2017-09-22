const express = require('express');
const path = require('path');
const config = require('../config/config');

const getYelpToken = require('./lib/get-yelp-token');

const staticFile = express.static('client/build/');
const app = express();
const PORT = process.env.PORT || config.PORT;
app.use(staticFile);


let yelpToken;

app.get('/api/places', async (req, res) => {
  const token = yelpToken || await getYelpToken(config.yelpID, config.yelpSecret);

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}. Press CTRL + C to terminate`);
});
