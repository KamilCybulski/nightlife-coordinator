/**
 * @param {string} name username
 * @param {string} email user's email
 * @param {string} location user's last searched location
 * @returns {object} an action object
 */
export default function logUserIn(name, email, location) {
  return {
    type: 'LOG_IN',
    payload: { name, email, location },
  };
}
