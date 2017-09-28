const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const getBarsData = require('./lib/get-bars-data.js');

// Express setup
const staticFile = express.static('client/build/');
const app = express();
app.use(staticFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the Database
mongoose.connect(process.env.NIGHTLIFE_DB_URI);


// Api routes
app.get('/api/bars', getBarsData);

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
