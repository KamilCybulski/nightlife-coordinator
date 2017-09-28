const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

/**
 * We use an array of just strings for barsToAttend, because Yelp API has it's
 * own id field for each bar, and it's value is a string.
 */
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  location: String,
  barsToAttend: [String],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
