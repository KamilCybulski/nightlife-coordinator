const initialState = {
  loggedIn: false,
  name: '',
  email: '',
};

const userReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case 'LOG_IN':
      newState = {
        loggedIn: true,
        name: action.payload.name,
        email: action.payload.email,
      };
      break;

    default:
      newState = { ...state };
  }

  return newState;
};

export default userReducer;
