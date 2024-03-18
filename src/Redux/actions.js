import {
  SET_SEARCH_QUERY,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  FETCH_DATA,
  BAD_RESPONSE_LINK,
} from "./types";

export function setSearchQuery(query) {
  return {
    type: SET_SEARCH_QUERY,
    payload: query,
  };
}

export function addIngredient(ingredient) {
  return {
    type: ADD_INGREDIENT,
    payload: ingredient,
  };
}

export function removeIngredient(ingredient) {
  return {
    type: REMOVE_INGREDIENT,
    payload: ingredient,
  };
}

export function resultDisplay(data) {
  return {
    type: FETCH_DATA,
    payload: data,
  };
}

export function badResponse(link) {
  return {
    type: BAD_RESPONSE_LINK,
    payload: link,
  };
}
