/**
 * loadBars
 * @param {array} bars Array of objects. Each object contains data for 
 *                     a single bar.
 * @returns {object} redux action
 */
export default function loadBars(bars) {
  return {
    type: 'LOAD_BARS',
    payload: bars,
  };
}
