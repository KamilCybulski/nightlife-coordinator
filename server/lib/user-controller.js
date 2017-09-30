const User = require('../models/user');

/**
 * register
 * @param {object} req Reference to the request object. Request body should
 *                     contain necessary user data.
 * Creates a new user in the database and logs them in.
 * @returns {object} Result object. In case of error contains error message.
 *                   Otherwise, contains user data for the frontend
 */
const register = req => new Promise((resolve) => {
  const { username, email, password } = req.body;
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


const login = req => new Promise((resolve) => {
  const { username, password } = req.body;

  User.authenticate()(username, password, (err, user, options) => {
    if (err) {
      resolve({
        success: false,
        error: err.message,
      });
    } else if (user === false) {
      resolve({
        success: false,
        error: options.message,
      });
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

const checkIfLoggedIn = user => new Promise((resolve) => {
  if (user) {
    resolve({
      success: true,
      username: user.username,
      email: user.email,
      location: user.location,
    });
  } else {
    resolve({
      success: false,
      error: 'User not logged in',
    });
  }
});

const logout = (req, res) => {
  req.logout();
  res.json({ success: true });
};

module.exports = { register, login, logout, checkIfLoggedIn };
