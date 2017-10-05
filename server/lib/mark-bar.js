const User = require('../models/user');
const Bar = require('../models/bar');

/**
 * increaseAttendantsNumberByOne
 * @param {string} id Yelp ID of a place a user wants to visit.
 * Updates the document with given id in bars collection by incrementing
 * attendants_number field by 1.
 * @returns {promise} Mongoose promise
 */
const increaseAttendantsNumberByOne = id => Bar.update(
  { id },
  { $inc: { attendants_number: 1 } },
).exec();

/**
 * createNewBarWithOneAttendant
 * @param {string} id Yelp ID of a place a user wants to visit.
 * @param {string} name Name of that place
 * @param {number} rating Rating of that place
 * Creates a new document if bars collectiom with attendants_number field
 * set to 1.
 * @returns {promise} Mongoose promise
 */
const createNewBarWithOneAttendant = (id, name, rating) => Bar.create(
  { id, name, rating, attendants_number: 1 },
);

/**
 * updateOrCreateBar
 * @param {string} id Yelp ID of a place a user wants to visit.
 * @param {string} name Name of that place
 * @param {number} rating Rating of that place
 * Checks if a bar with a given id exists in bars collection. If it does,
 * it simply updates it by increasing attendants_number by one. If it doesnt,
 * it creates new Bar document with attentands_number set to 1.
 * @returns {promise} Mongoose promise
 */
const updateOrCreateBar = (id, name, rating) =>
  Bar.findOne({ id }, (err, doc) => {
    if (doc) return increaseAttendantsNumberByOne(id);
    return createNewBarWithOneAttendant(id, name, rating);
  });

/**
 * markBar
 * @param {object} req Reference to the request object
 * Updates currently logged user by adding given id to barsToAttend array
 * @returns {promise} Mongoose promise
 */
module.exports = req => User.updateOne(
  { _id: req.user._id },
  { $push: { barsToAttend: req.body.id } }).exec()
  .then(() =>
    updateOrCreateBar(req.body.id, req.body.name, req.body.rating))
  .catch(err => Promise.reject(err.message));
