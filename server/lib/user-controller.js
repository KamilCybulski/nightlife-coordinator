const User = require('../models/user');

/**
 * register
 * @param {string} username User's name.
 * @param {string} email User's email.
 * @param {string} password User's password.
 * @param {object} req Reference to the request object (to perform logging in).
 * Creates a new user in the database and logs them in.
 * @returns {object} Result object. In case of error contains error message.
 *                   Otherwise, contains user data for the frontend
 */
const register = (username, email, password, req) => new Promise((resolve) => {
  const newUser = new User({ username, email });

  User.register(newUser, password, (err, user) => {
    if (err) {
      resolve({ success: false, error: err.message });
    } else {
      req.login(user, () => {
        resolve({
          success: true,
          username: user.username,
          email: user.email,
          location: user.location,
        });
      });
    }
  });
});

const login = (req, res, next) => {
  const { username, password } = req.body;

  User.authenticate()(username, password, (err, user, options) => {
    if (err) return next(err);

    if (user === false) {
      return res.json({ success: false, error: options.message });
    }

    return req.login(user, () => res.json({
      success: true,
      username: user.username,
      email: user.email,
      location: user.location,
    }));
  });
};

const checkIfLoggedIn = (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      username: req.user.username,
      email: req.user.email,
      location: req.user.location,
    });
  } else {
    res.json({
      success: false,
      error: 'User not logged in',
    });
  }
};

const logout = (req, res) => {
  req.logout();
  res.json({ success: true });
};

module.exports = { register, login, logout, checkIfLoggedIn };
