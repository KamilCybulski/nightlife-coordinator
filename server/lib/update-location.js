const User = require('../models/user');

module.exports = (id, location) =>
  User.update({ _id: id }, { location }).exec();
