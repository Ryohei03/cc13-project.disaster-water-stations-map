const defaultState = {
  locations: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_LOCATIONS":
      return { ...state, locations: action.locations };
    default:
      return state;
  }
};

export default reducer;
