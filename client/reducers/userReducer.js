const userReducer = (state = {}, action) => {
  let newState;

  switch (action.type) {
    case 'LOG_IN':
      newState = {
        ...state,
        user: action.payload,
      };
      break;

    default:
      newState = { ...state };
  }

  return newState;
};

export default userReducer;
