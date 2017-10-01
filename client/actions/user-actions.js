/**
 * logUserIn
 * @param {string} name username
 * @param {string} email user's email
 * @param {string} location user's last searched location
 * Payload contains user data
 * @returns {object} an action object
 */
export function logUserIn(name, email, location) {
  return {
    type: 'LOG_IN',
    payload: { name, email, location },
  };
}

/**
 * logUserOut
 * Informs a reducer that it should clear user's data
 * @returns {object} an action object
 */
export function logUserOut() {
  return {
    type: 'LOG_OUT',
  };
}

/**
 * markUserAsChecked
 * Informs a reducer that user has been checked in DB and is not logged in
 * @returns {object} an ation object
 */
export function markUserAsChecked() {
  return {
    type: 'MARK_USER_CHECKED',
  };
}

/**
 * updateLocation
 * @param {string} location New location to update
 * Replace the current location in the user substate with new.
 * @returns {object} an action object
 */
export function updateLocation(location) {
  return {
    type: 'UPDATE_LOCATION',
    payload: location,
  };
}
