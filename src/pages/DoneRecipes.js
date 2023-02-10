/* eslint-disable react-hooks/exhaustive-deps */
import clipboardCopy from 'clipboard-copy';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
// import doneRecipesMock from '../tests/mocks/dataDoneRecipes';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [recipesData, setRecipesData] = useState([]);
  const [alerta, setAlerta] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    const doneRecipesArr = JSON.parse(window.localStorage.getItem('doneRecipes'));
    setRecipesData(doneRecipesArr);
    // setRecipesData(doneRecipesMock);
  }, []);

  const setDrinkItens = () => {
    setFilter('drink');
  };

  const setMealItens = () => {
    setFilter('meal');
  };

  const setAllItens = () => {
    setFilter('all');
  };

  useEffect(() => {
    const doneRecipesArr = JSON.parse(window.localStorage.getItem('doneRecipes'));
    const mealFilter = recipesData.filter((recipe) => recipe.type === 'meal');
    const drinkFilter = recipesData.filter((recipe) => recipe.type === 'drink');
    if (filter === 'meal') {
      setDoneRecipes(mealFilter);
    } if (filter === 'drink') {
      setDoneRecipes(drinkFilter);
    } if (filter === 'all') {
      setDoneRecipes(doneRecipesArr);
    }
  }, [filter]);

  const shareButton = (id, type) => {
    const goodTime = 2000;
    clipboardCopy(`${window.location.origin}/${type}s/${id}`);
    // navigator.clipboard.writeText(
    //   `${window.location.origin}/${type}s/${id}`,
    // );
    setAlerta(true);
    setTimeout(() => {
      setAlerta(false);
    }, goodTime);
  };

  const detailsRedirect = (id, type) => {
    history.push(`${type}s/${id}`);
  };

  return (
    <div>
      <Header />
      <div className="doneCategories">
        <button
          data-testid="filter-by-all-btn"
          className="favoriteCategoryBtn allImg"
          onClick={ setAllItens }
        >
          <div className="txtFilterDone">
            All
          </div>
        </button>
        <button
          data-testid="filter-by-meal-btn"
          className="favoriteCategoryBtn foodImg"
          onClick={ setMealItens }
        >
          <div className="txtFilterDone">
            Food
          </div>
        </button>
        <button
          data-testid="filter-by-drink-btn"
          className="favoriteCategoryBtn drinksImg"
          onClick={ setDrinkItens }
        >
          <div className="txtFilterDone">
            Drinks
          </div>
        </button>
      </div>
      <div className="donesDisplay">
        {
          alerta && <p className="linkCopied">Link copied!</p>
        }
        {
          doneRecipes && doneRecipes.map((recipe, index) => (
            <div
              key={ recipe.id }
              className="doneDisplay"
            >
              <button
                type="button"
                onClick={ () => detailsRedirect(recipe.id, recipe.type) }
                className="doneImgBtn"
              >
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                  className="doneImg"
                />
              </button>
              <div className="doneInfos">
                <button
                  type="button"
                  onClick={ () => detailsRedirect(recipe.id, recipe.type) }
                  className="doneTitleBtn"
                >
                  <p
                    data-testid={ `${index}-horizontal-name` }
                    className="doneTitle"
                  >
                    {recipe.name}
                  </p>
                </button>
                {
                  recipe.type === 'meal'
                    ? (
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                        className="doneCategory"
                      >
                        {`${recipe.nationality} - ${recipe.category}`}
                      </p>
                    )
                    : (
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                        className="doneCategory"
                      >
                        {recipe.alcoholicOrNot}
                      </p>
                    )
                }
                <p className="doneInTxt">
                  {'Done in: '}
                  <span data-testid={ `${index}-horizontal-done-date` }>
                    {recipe.doneDate}
                  </span>
                </p>
                {recipe.type === 'meal' && (
                  <div className="doneTags">
                    {recipe.tags.map((tag, i) => (
                      i <= 1 && (
                        <p
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                          key={ i }
                          className="doneTag"
                        >
                          {tag}
                        </p>)
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  onClick={ () => shareButton(recipe.id, recipe.type) }
                  className="doneShareBtn"
                >
                  <img
                    src={ shareIcon }
                    alt="Share"
                    data-testid={ `${index}-horizontal-share-btn` }
                    className="doneShareImg"
                  />
                </button>
              </div>
            </div>))
        }
      </div>
    </div>
  );
}
