import {
  SET_SEARCH_QUERY,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  FETCH_DATA,
  BAD_RESPONSE_LINK,
} from "./types";

const initialState = {
  searchQuery: "",
  ingredients: [],
  badResponse: "inactive",
};

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient !== action.payload
        ),
      };
    case FETCH_DATA:
      return { ...state, data: action.payload };
    case BAD_RESPONSE_LINK:
      return { ...state, badResponse: action.payload };
    default:
      return state;
  }
}

export default searchReducer;
