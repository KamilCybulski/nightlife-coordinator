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

    case 'ADD_ATTENDANT':
      newState = {
        places: [
          ...state.places.slice(0, action.payload),
          {
            id: state.places[action.payload].id,
            name: state.places[action.payload].name,
            rating: state.places[action.payload].rating,
            attendants_number: state.places[action.payload].attendants_number + 1,
          },
          ...state.places.slice(action.payload + 1),
        ],
      };
      break;

    case 'REMOVE_ATTENDANT':
      newState = {
        places: [
          ...state.places.slice(0, action.payload),
          {
            id: state.places[action.payload].id,
            name: state.places[action.payload].name,
            rating: state.places[action.payload].rating,
            attendants_number: state.places[action.payload].attendants_number - 1,
          },
          ...state.places.slice(action.payload + 1),
        ],
      };
      break;

    default:
      newState = { ...state };
  }

  return newState;
};

export default barsReducer;
