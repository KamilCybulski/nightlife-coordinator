/**
 * Initial values in bars substate
 * places {array || null} -> Each object in the array contains data about
 *                           single bar.
 */
const initialState = {
  places: null,
};
const barsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case 'LOAD_BARS':
      newState = {
        places: action.payload,
      };
      break;

    case 'CLEAR_BARS':
      newState = {
        places: null,
      };
      break;

    default:
      newState = { ...state };
  }

  return newState;
};

export default barsReducer;
