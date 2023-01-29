import React from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  return (
    <div>
      <Header />
      <br />
      <div className="favoriteCategories">
        <button
          className="favoriteCategoryBtn allImg"
          data-testid="filter-by-all-btn"
        >
          <span className="allTxt">
            All
          </span>
        </button>
        <button
          className="favoriteCategoryBtn foodImg"
          data-testid="filter-by-meal-btn"
        >
          <span className="foodTxt">
            Food
          </span>
        </button>
        <button
          className="favoriteCategoryBtn drinksImg"
          data-testid="filter-by-drink-btn"
        >
          <span className="drinksTxt">
            Drinks
          </span>
        </button>
      </div>
      <div className="favoritesDisplay">
        <div
          className="favoriteDisplay"
          // data-testid="${index}-horizontal-image"
        >
          {/* <img src= alt="" /> */}
          <div className="favoriteImg" />
          {/* <span data-testid="${index}-horizontal-name">Nome</span>
          <span data-testid="${index}-horizontal-top-text">Categoria</span> */}
        </div>
      </div>
    </div>
  );
}
