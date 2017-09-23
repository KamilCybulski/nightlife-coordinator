module.exports = (places, db) => {
  const query = places.map(place => ({ id: place.id }));
  return db.collection('bars')
    .find({ $or: query }, { _id: 0 })
    .toArray();
};
