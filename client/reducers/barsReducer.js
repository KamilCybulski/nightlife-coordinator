const barsReducer = (state = {}, action) => {
  let newState;

  switch (action.type) {
    case 'LOAD_BARS':
      newState = {
        ...state,
        bars: action.payload,
      };
      break;

    default:
      newState = { ...state };
  }

  return newState;
};

export default barsReducer;
