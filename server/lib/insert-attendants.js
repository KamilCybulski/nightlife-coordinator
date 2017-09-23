module.exports = (places, attendants) => places.map(place => ({
  id: place.id,
  name: place.name,
  rating: place.rating,
  attendants_number: attendants[place.id],
}));
