

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const updateLocation = require('./lib/update-location');
const getBarsData = require('./lib/get-bars-data.js');
const userController = require('./lib/user-controller');
const User = require('./models/user');

// Express setup
const staticFile = express.static('client/build/');
const app = express();
app.use(staticFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'Earth is flat',
  saveUninitialized: true,
  resave: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport setup
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to the Database
mongoose.connect(process.env.NIGHTLIFE_DB_URI);


// Api routes
app.get('/api/bars', async (req, res) => {
  if (!req.query.location) return res.json({ error: 'No location specified' });
  if (req.user) updateLocation(req.user._id, req.query.location);

  const bars = await getBarsData(req.query.location);
  return res.json(bars);
});

app.post('/api/signup', async (req, res) => {
  const result = await userController.register(req);
  res.json(result);
});

app.post('/api/login', async (req, res) => {
  const result = await userController.login(req);
  res.json(result);
});

app.get('/api/logout', async (req, res) => {
  await userController.logout(req);
  res.json({ success: true });
});

app.get('/api/verifyuser', async (req, res) => {
  const result = await userController.checkIfLoggedIn(req.user);
  res.json(result);
});

// Send the main html file
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(process.env.PORT || 3001);
