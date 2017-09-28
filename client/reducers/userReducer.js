const initialState = {
  isLoggedIn: false,
  name: '',
  email: '',
  location: undefined,
};

const userReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case 'LOG_IN':
      newState = {
        isLoggedIn: true,
        name: action.payload.name,
        email: action.payload.email,
        location: action.payload.location,
      };
      break;

    case 'LOG_OUT':
      newState = {
        isLoggedIn: false,
        name: '',
        email: '',
        location: undefined,
      };
      break;

    default:
      newState = { ...state };
  }

  return newState;
};

export default userReducer;
