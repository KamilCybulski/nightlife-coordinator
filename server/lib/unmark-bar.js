const User = require('../models/user');
const Bar = require('../models/bar');

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
).exec()
  .then(() => Bar.findOneAndUpdate(
    { id: req.body.placeID },
    { $inc: { attendants_number: -1 } },
  ))
  .catch(err => Promise.reject(err.message));
