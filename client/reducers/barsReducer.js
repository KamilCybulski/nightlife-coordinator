const initialState = {
  bars: [],
};

const barsReducer = (state = initialState, action) => {
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
