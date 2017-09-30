/**
 * Initial values in bars substate
 * checkedInDB {boolean} -> flag prop to let app know if the user data have
 *                          been retrieved from the database
 * places {array of objects} -> Each object in the array contains data about
 *                              single bar
 */
const initialState = {
  checkedInDB: false,
  places: [],
};
const barsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case 'LOAD_BARS':
      newState = {
        checkedInDB: true,
        places: action.payload,
      };
      break;

    default:
      newState = { ...state };
  }

  return newState;
};

export default barsReducer;
