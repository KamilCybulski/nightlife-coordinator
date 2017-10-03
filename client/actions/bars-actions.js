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
