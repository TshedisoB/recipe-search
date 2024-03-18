import { resultDisplay, badResponse } from "./actions";

export function fetchResults() {
  return async (dispatch, getState) => {
    const searchQuery = getState().searchQuery;
    const ingredients = getState().ingredients;
    const id = process.env.REACT_APP_ID;
    const key = process.env.REACT_APP_KEY;
    let combinedSearch = [searchQuery];
    if (ingredients.length > 0) {
      combinedSearch = [searchQuery, ...ingredients].join("+");
    }

    const res = await fetch(
      `https://api.edamam.com/search?q=${combinedSearch}&app_id=${id}&app_key=${key}&from=0&to=100`
    );

    if (!res.ok) {
      return dispatch(badResponse("active"));
    }

    const recipeData = await res.json();
    dispatch(resultDisplay(recipeData.hits));
  };
}
