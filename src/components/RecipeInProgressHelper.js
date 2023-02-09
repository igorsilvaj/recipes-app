import React from 'react';
import PropTypes from 'prop-types';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import favoritedIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/png/shareIcon.png';

export default function RecipeInProgressHelper(props) {
  const { data, path, source, favorite, ingredients, ingredientChk, handleChange,
    measure, isButtonDisabled, handleBtnClick, handleClick } = props;
  return (
    <div className="recipeDetailsContainer">
      <img
        src={ data[path][0][`str${source}Thumb`] }
        alt=""
        data-testid="recipe-photo"
        className="recipeDetailImg"
      />
      <div className="recipeDetaillsHeaderItems">
        <p>
          <span data-testid="recipe-category" className="recipeDetailsCategory">
            {path === 'drinks'
              ? `${data[path][0].strCategory} ${data[path][0].strAlcoholic}`
              : data[path][0].strCategory}
          </span>
        </p>
        <button
          type="button"
          onClick={ (event) => handleClick(event) }
          className="recipeDetailsShareBtn"
        >
          <img
            name="share"
            data-testid="share-btn"
            src={ shareIcon }
            alt="Share Icon"
            className="recipeDetailsTopImg"
          />
        </button>
        <button
          type="button"
          onClick={ (event) => handleClick(event) }
          className="recipeDetailsFavoriteBtn"
        >
          <img
            name="favorite"
            data-testid="favorite-btn"
            src={ favorite ? favoritedIcon : favoriteIcon }
            alt="Favorite Icon"
            className="recipeDetailsTopImg"
          />
        </button>
      </div>
      <p>
        <span data-testid="recipe-title" className="recipeDetailsTitle">
          {data[path][0][`str${source}`]}
        </span>
      </p>
      <div className="recipeDetailsIngredients">
        <h3 className="recipeDetailsBodyTitle">Ingredients</h3>
        <div className="boxWithBorder">
          {ingredients && ingredients.map((e, index) => (
            <div key={ `ingredient-${index}` }>
              <label
                className={
                  `${ingredientChk[`ingredient-${index}`] && 'step-check'} 
ingredientCheckList`
                }
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ `ingredient-${index}` }
              >
                <input
                  id={ `ingredient-${index}` }
                  type="checkbox"
                  name={ `ingredient-${index}` }
                  checked={ ingredientChk[`ingredient-${index}`] }
                  onChange={ handleChange }
                />
                <h5>
                  {measure[index] !== undefined ? ` ${measure[index]} - ${e}` : ` ${e}`}
                </h5>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="recipeDetailsInstructions">
        <h3 className="recipeDetailsBodyTitle">Instructions</h3>
        <div className="boxWithBorder">
          <span data-testid="instructions">{data[path][0].strInstructions}</span>
        </div>
      </div>
      <button
        disabled={ isButtonDisabled }
        onClick={ handleBtnClick }
        type="button"
        data-testid="finish-recipe-btn"
        className="btnFinishRecipe"
      >
        finish recipe
      </button>
    </div>
  );
}

RecipeInProgressHelper.propTypes = {
  data: PropTypes.shape({}),
  path: PropTypes.string,
  source: PropTypes.string,
  favorite: PropTypes.string,
  ingredients: PropTypes.array,
  measure: PropTypes.array,
  ingredientChk: PropTypes.shape({}),
  handleChange: PropTypes.func,
  isButtonDisabled: PropTypes.bool,
  handleBtnClick: PropTypes.func,
  handleClick: PropTypes.func,
}.isRequired;
