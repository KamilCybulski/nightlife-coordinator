const Bar = require('../models/bars');

module.exports = (places) => {
  const query = places.map(place => ({ id: place.id }));
  return Bar.find({ $or: query }, { _id: 0 });
};
