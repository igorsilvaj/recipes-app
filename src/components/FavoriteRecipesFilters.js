import React from 'react';
import PropTypes from 'prop-types';

function FavoriteRecipesFilters({ handleClick }) {
  return (
    <div className="favoriteCategories">
      <button
        className="favoriteCategoryBtn allImg"
        data-testid="filter-by-all-btn"
        onClick={ (e) => handleClick(e) }
      >
        <div className="txtFilterFavorites">
          All
        </div>
      </button>
      <button
        className="favoriteCategoryBtn foodImg"
        data-testid="filter-by-meal-btn"
        onClick={ (e) => handleClick(e) }
      >
        <div className="txtFilterFavorites">
          Food
        </div>
      </button>
      <button
        className="favoriteCategoryBtn drinksImg"
        data-testid="filter-by-drink-btn"
        onClick={ (e) => handleClick(e) }
      >
        <div className="txtFilterFavorites">
          Drinks
        </div>
      </button>
    </div>
  );
}

FavoriteRecipesFilters.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default FavoriteRecipesFilters;
