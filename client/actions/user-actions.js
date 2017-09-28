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
