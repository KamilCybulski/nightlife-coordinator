/**
 * Initial values in User substate
 * checkedInDB {boolean} -> flag prop to let app know if the user data have
 *                          been retrieved from the database
 * isLoggedIn {boolean}-> flag prop the let app know if the user is logged in
 * name {string} -> user's name
 * email {string} -> user's email
 * location {string} -> last location user queried in the search
 * barsToAttend {array of string} -> contains id's of bars that user intends to
 *                                   attend
 */
const initialState = {
  checkedInDB: false,
  isLoggedIn: false,
  name: '',
  email: '',
  location: '',
  barsToAttend: [],
};

const userReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case 'LOG_IN':
      newState = {
        checkedInDB: true,
        isLoggedIn: true,
        name: action.payload.name,
        email: action.payload.email,
        location: action.payload.location,
        barsToAttend: action.payload.barsToAttend,
      };
      break;

    case 'LOG_OUT':
      newState = {
        checkedInDB: true,
        isLoggedIn: false,
        name: '',
        email: '',
        location: '',
        barsToAttend: [],
      };
      break;

    case 'MARK_USER_CHECKED':
      newState = {
        checkedInDB: true,
        isLoggedIn: false,
        name: '',
        email: '',
        location: '',
        barsToAttend: [],
      };
      break;

    case 'UPDATE_LOCATION':
      newState = {
        ...state,
        location: action.payload,
      };
      break;

    case 'VISIT_BAR':
      newState = {
        ...state,
        barsToAttend: [...state.barsToAttend, action.payload],
      };
      break;

    case 'FORGO_BAR':
      newState = {
        ...state,
        barsToAttend: state.barsToAttend.filter(e => e !== action.payload),
      };
      break;

    default:
      newState = { ...state };
  }

  return newState;
};

export default userReducer;
