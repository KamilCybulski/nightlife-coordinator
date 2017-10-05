/**
 * loadBars
 * @param {array} bars Array of objects. Each object contains data for 
 *                     a single bar.
 * @returns {object} redux action
 */
export function loadBars(bars) {
  return {
    type: 'LOAD_BARS',
    payload: bars,
  };
}

/**
 * clearBars
 * Restore whole bars substate to it's initial value
 * @returns {object} redux action
 */
export function clearBars() {
  return {
    type: 'CLEAR_BARS',
  };
}

/**
 * addAttendant
 * Increases attendants_number by 1
 * @param {number} index Index of the enrty in places array that should be affected
 * @returns {object} redux action
 */
export function addAttendant(index) {
  return {
    type: 'ADD_ATTENDANT',
    payload: index,
  };
}

/**
 * removeAttendant
 * Decreases attendants_number by 1
 * @param {number} index Index of the enrty in places array that should be affected
 * @returns {object} redux action
 */
export function removeAttendant(index) {
  return {
    type: 'REMOVE_ATTENDANT',
    payload: index,
  };
}
