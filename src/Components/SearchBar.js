import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsSearch } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { connect } from "react-redux";
import RecipeList from "./ResultsTable";
import {
  setSearchQuery,
  addIngredient,
  removeIngredient,
} from "../Redux/actions";
import { fetchResults } from "../Redux/thunks";
import CircularProgress from "@material-ui/core/CircularProgress";

const SearchPage = (props) => {
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    props
      .fetchResults()
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false);
        alert(`${error.message} 
        \nInvalid API ID/KEY
        \nCheck the .env file`);
      });
  };

  const handleClick = () => {
    const inputValue = document.querySelector(".ingredient-input").value;
    if (inputValue) {
      props.addIngredient(inputValue);
      handleSearch();
      document.querySelector(".ingredient-input").value = "";
      return inputValue;
    }
  };

  let displayTable = undefined;
  if (props.searchQuery) {
    displayTable = <RecipeList searchResults={props.resultDisplay} />;
  }

  return (
    <div className="search">
      <label id="recipeLabel">
        Recipe:
        <br />
        <div className="search-input-container">
          <input
            className="search-input"
            type="text"
            value={props.searchQuery}
            onChange={(e) => props.setSearchQuery(e.target.value)}
            placeholder="Search for recipe"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button id="search-btn" onClick={handleSearch}>
            <BsSearch />
          </button>
        </div>
      </label>

      <br />
      <div>
        <label id="ingredientsLabel">Ingredients:</label>
        <br />
        {props.ingredients.map((ingredient, index) => (
          <div className="ingredients" key={index}>
            {ingredient}
            <button
              id="removeButton"
              onClick={() => {
                props.removeIngredient(ingredient);
                handleSearch();
              }}>
              X
            </button>
          </div>
        ))}
      </div>

      <div className="ingredient-input-container">
        <input
          type="text"
          className="ingredient-input"
          placeholder="Add an ingredient"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleClick();
            }
          }}
        />
        <button id="addButton" onClick={handleClick}>
          <GrAdd />
        </button>
      </div>

      <div className="result">
        {loading && <CircularProgress />} {displayTable}
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  searchQuery: PropTypes.string,
  ingredients: PropTypes.array,
  setSearchQuery: PropTypes.func,
  addIngredient: PropTypes.func,
  removeIngredient: PropTypes.func,
};

const mapStateToProps = (state) => ({
  searchQuery: state.searchQuery,
  ingredients: state.ingredients,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchQuery: (query) => dispatch(setSearchQuery(query)),
  addIngredient: (ingredient) => dispatch(addIngredient(ingredient)),
  removeIngredient: (ingredient) => dispatch(removeIngredient(ingredient)),
  fetchResults: () => dispatch(fetchResults()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
