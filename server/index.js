const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const getYelpToken = require('./lib/get-yelp-token');
const getBars = require('./lib/get-bars');
const getAttendants = require('./lib/get-attendants');
const insertAttendants = require('./lib/insert-attendants');
const arrayToObject = require('./lib/array-to-object');

// Express setup
const staticFile = express.static('client/build/');
const app = express();
app.use(staticFile);


// Variables to use later in the app
let db;
let yelpToken;


// Connect to the Database
MongoClient.connect(process.env.NIGHTLIFE_DB_URI, (err, database) => {
  db = database;

  app.listen(process.env.PORT || 3001);
});


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

  const attendantsArr = await getAttendants(bars, db);
  if (!attendantsArr) return res.json({ error: 'Cannot connect to the DB' });

  const data = insertAttendants(bars, arrayToObject(attendantsArr));
  return res.json({ data });
});

app.get('/api/test', async (req, res) => {
  const val = await db.collection('test').findOne();
  res.json({ val });
});


// Send the main html file
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
