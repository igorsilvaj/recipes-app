import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import doneRecipesMock from '../tests/mocks/dataDoneRecipes';

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
    const mealFilter = recipesData.filter((recipe) => recipe.type === 'meal');
    const drinkFilter = recipesData.filter((recipe) => recipe.type === 'drink');
    if (filter === 'meal') {
      setDoneRecipes(mealFilter);
    } if (filter === 'drink') {
      setDoneRecipes(drinkFilter);
    } if (filter === 'all') {
      setDoneRecipes(doneRecipesMock);
    }
  }, [filter]);

  const shareButton = (id, type) => {
    const goodTime = 2000;
    navigator.clipboard.writeText(
      `${window.location.origin}/${type}s/${id}`,
    );
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
      <div>
        <button
          data-testid="filter-by-all-btn"
          className="recipeCategory"
          onClick={ setAllItens }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          className="recipeCategory"
          onClick={ setMealItens }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          className="recipeCategory"
          onClick={ setDrinkItens }
        >
          Drinks
        </button>
      </div>
      {
        doneRecipes && doneRecipes.map((recipe, index) => (
          <div
            key={ recipe.id }
          >
            <button
              type="button"
              onClick={ () => detailsRedirect(recipe.id, recipe.type) }
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                width={ 150 }
              />
            </button>
            <button
              type="button"
              onClick={ () => detailsRedirect(recipe.id, recipe.type) }
            >
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </button>
            {
              recipe.type === 'meal'
                ? (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${recipe.nationality} - ${recipe.category}`}
                  </p>
                )
                : (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.alcoholicOrNot}
                  </p>
                )
            }

            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            {recipe.type === 'meal' && (
              <div>
                {recipe.tags.map((tag, i) => (
                  i <= 1 && (
                    <p
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                      key={ i }
                    >
                      {tag}
                    </p>)
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={ () => shareButton(recipe.id, recipe.type) }
            >
              <img
                src={ shareIcon }
                alt="Share"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            {
              alerta && <p>Link copied!</p>
            }
          </div>))

      }
    </div>
  );
}
