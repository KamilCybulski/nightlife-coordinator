module.exports = arr => arr.reduce((obj, item) =>
  Object.assign({ [item.id]: item.attendants_number }, obj), {});
