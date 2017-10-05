const User = require('../models/user');

/**
 * unmarkBar
 * @param {object} req Reference to the request object
 * Updates currently logged user by removing given placeID from 
 * barsToAttend array
 * @returns {promise} Mongoose promise
 */
module.exports = req => User.updateOne(
  { _id: req.user._id },
  { $pull: { barsToAttend: req.body.placeID } },
).exec();
