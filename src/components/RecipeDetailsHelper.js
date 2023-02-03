import React from 'react';
import PropTypes from 'prop-types';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import favoritedIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import RecommendationsCard from './RecommendationsCard';

export default function RecipeDetailsHelper(props) {
  const { data, path, source, favorite, matcher2, ingredients, measure,
    video, recommendations, isDoneRecipe, handleClick, isinProgressRecipe,
    startRecipe } = props;
  const maxRecom = 6;
  return (
    <div className="recipeDetailsContainer">
      <img
        src={
          data[path][0][`str${source}Thumb`]
        }
        alt=""
        data-testid="recipe-photo"
        className="recipeDetailImg"
      />
      <div className="recipeDetaillsHeaderItems">
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
        {/* <div
          className={
            `${source === 'Meal' ? 'imgMealCategoryDetails' : 'imgDrinkCategoryDetails'} ${data[path][0].strCategory.replace(/\s/g, '').replace('/', '')}`
          }
        /> */}
        <span data-testid="recipe-category" className="recipeDetailsCategory">
          {
            path === 'drinks'
              ? `${data[path][0].strCategory} ${data[path][0].strAlcoholic}`
              : data[path][0].strCategory
          }
        </span>
      </div>
      <span data-testid="recipe-title" className="recipeDetailsTitle">
        {data[path][0][`str${source}`]}
      </span>
      <div className="recipeDetailsIngredients">
        <h3 className="recipeDetailsBodyTitle">Ingredients</h3>
        <div className="boxWithBorder">
          {
            ingredients.map((e, index) => (
              <p key={ `ingredient-${index}` }>
                •
                <span
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${measure[index]} ${e}`}
                </span>
              </p>
            ))
          }
        </div>
      </div>
      <div className="recipeDetailsInstructions">
        <h3 className="recipeDetailsBodyTitle">Instructions</h3>
        <div className="boxWithBorder">
          <span data-testid="instructions">{data[path][0].strInstructions}</span>
        </div>
      </div>
      <div className="recipeDetailsVideo">
        <h3 className="recipeDetailsBodyTitle">Video</h3>
        <iframe
          width="340"
          height="315"
          src={ video }
          title="YouTube video player"
          allow={ `accelerometer;
autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share` }
          allowFullScreen
          data-testid="video"
        />
      </div>
      <div className="recipeDetailsRecommendations">
        <h3 className="recipeDetailsBodyTitle">Recommended</h3>
        {recommendations
                && (
                  <div className="carouselContainer">
                    {recommendations[matcher2]
                      .map((a, index) => (
                        index < maxRecom && (
                          <RecommendationsCard
                            key={ `key-${index}` }
                            recipe={ a }
                            index={ index }
                          />)))}
                  </div>)}
      </div>

      {
        !isDoneRecipe
        && (
          <button
            type="button"
            name="startRecipe"
            data-testid="start-recipe-btn"
            className="btnStartRecipe"
            onClick={ startRecipe }
          >
            {isinProgressRecipe
              ? (
                <span name="startRecipe">
                  Continue Recipe
                </span>)
              : (
                <span name="startRecipe">
                  Start Recipe
                </span>
              )}
          </button>
        )
      }
    </div>
  );
}

RecipeDetailsHelper.propTypes = {
  data: PropTypes.shape({}),
  path: PropTypes.string,
  source: PropTypes.string,
  favorite: PropTypes.string,
  matcher2: PropTypes.string,
  ingredients: PropTypes.array,
  measure: PropTypes.array,
  video: PropTypes.string,
  recommendations: PropTypes.array,
  isDoneRecipe: PropTypes.bool,
  handleClick: PropTypes.func,
  isinProgressRecipe: PropTypes.bool,
  startRecipe: PropTypes.func,
}.isRequired;
