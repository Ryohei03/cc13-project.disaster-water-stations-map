const defaultState = {
  locations: [],
  selectMarker: null,
};

export function SET_MARKER(marker) {
  return {
    type: "SET_MARKER",
    payload: marker,
  };
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_LOCATIONS":
      return { ...state, locations: action.locations };
    case "SET_MARKER":
      return { ...state, selectMarker: action.payload };
    default:
      return state;
  }
};

export default reducer;
