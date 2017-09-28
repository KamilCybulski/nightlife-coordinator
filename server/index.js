const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const getYelpToken = require('./lib/get-yelp-token');
const getBars = require('./lib/get-bars');
const getAttendants = require('./lib/get-attendants');
const insertAttendants = require('./lib/insert-attendants');
const arrayToObject = require('./lib/array-to-object');

// Express setup
const staticFile = express.static('client/build/');
const app = express();
app.use(staticFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Variables to use later in the app
let yelpToken;


// Connect to the Database
mongoose.connect(process.env.NIGHTLIFE_DB_URI);


// Api routes
app.get('/api/bars', async (req, res) => {
  if (!req.query.location) return res.json({ error: 'No location specified' });

  const id = process.env.YELP_CLIENT_ID;
  const secret = process.env.YELP_CLIENT_SECRET;
  const token = yelpToken || await getYelpToken(id, secret);

  if (!yelpToken && token) yelpToken = token;
  if (!token) return res.json({ error: 'No yelp token' });

  const bars = await getBars(token, req.query.location);
  if (!bars) return res.json({ error: 'Cannot connect to yelp API' });

  const attendantsArr = await getAttendants(bars);
  if (!attendantsArr) return res.json({ error: 'Cannot connect to the DB' });

  const data = insertAttendants(bars, arrayToObject(attendantsArr));
  return res.json({ data });
});

app.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;
  // Just temporary setup. When doing authentication,
  // send only username, email and location
  res.json({ username, email, password, location: 'warsaw' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Temporary setup. Remove password when doing authentication
  res.json({ username, password, email: 'placeholder', location: 'warsaw' });
});


// Send the main html file
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(process.env.PORT || 3001);
