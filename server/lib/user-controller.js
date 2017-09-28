const User = require('../models/user');

const register = (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email });

  User.register(newUser, password, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        error: err.message,
      });
    }

    return res.json({
      success: true,
      username: result.username,
      email: result.email,
      location: result.location,
    });
  });
};

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