/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchApi, fetchApi2 } from '../redux/actions';
import Recommendations from '../components/RecommendationsCard';
import favoriteIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails({ getData, data, getData2, recommendations }) {
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const source = path.charAt(0).toUpperCase() + path.slice(1, path.length - 1);
  const matcher = path.charAt(0).toUpperCase() + path.slice(1, path.length - 1)
    === 'Meal' ? 'Drink' : 'Meal';
  const matcher2 = `${matcher.toLocaleLowerCase()}s`;
  const { id } = useParams();
  // requisito 29, verificar se receita já foi feita
  const maxRecom = 6;
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const isDoneRecipe = doneRecipes && !!(doneRecipes.find((e) => e.id === id));

  // requisito 30, verificar se receita está em andamento
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const isinProgressRecipe = inProgressRecipes && !!inProgressRecipes[path][id];
  // const inProgressRecipesMock = {
  //   drinks: {
  //     15997: ['lista-de-ingredientes-utilizados'],
  //   },
  //   meals: {
  //     52977: ['lista-de-ingredientes-utilizados'],
  //   },
  // };
  // const mockStorage = () => {
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipesMock));
  // };
  // mockStorage();
  // console.log(doneRecipes);
  // const doneRecipesMock = [
  //   {
  //     id: '15997',
  //     type: 'drink',
  //     nationality: 'Germany',
  //     category: 'Ordinary Drink',
  //     alcoholicOrNot: 'Optional alcohol',
  //     name: 'GG',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  //     doneDate: '21/12/2019',
  //     tags: [],
  //   },
  //   {
  //     id: '52977',
  //     type: 'meal',
  //     nationality: 'Turkish',
  //     category: 'Side',
  //     alcoholicOrNot: '',
  //     name: 'Corba',
  //     image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  //     doneDate: '21/08/2019',
  //     tags: ['Soup'],
  //   },
  //   {
  //     id: '17222',
  //     type: 'drink',
  //     nationality: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'A1',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  //     doneDate: '25/12/2019',
  //     tags: [],
  //   },
  //   {
  //     id: '53060',
  //     type: 'meal',
  //     nationality: 'Croatian',
  //     category: 'Side',
  //     alcoholicOrNot: '',
  //     name: 'Burek',
  //     image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  //     doneDate: '21/12/2020',
  //     tags: ['Streetfood', 'Onthego'],
  //   },
  // ];

  // const mockStorage = () => {
  //   localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
  // };

  useEffect(() => {
    if (pathname.includes('/meals')) {
      getData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      getData2('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
    if (pathname.includes('/drinks')) {
      getData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      getData2('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
  }, [id]);

  const ingredients = data && data !== undefined
  && Object.entries(data[path][0]).filter((ingredient) => (
    ingredient[0].includes('strIngredient'))).map((e) => e[1]).filter(
    (e) => (e !== '' && e !== null),
  );
  const measure = data && Object.entries(data[path][0]).filter((ingredient) => (
    ingredient[0].includes('strMeasure'))).map((e) => e[1]).filter(
    (e) => (e !== '' && e !== null),
  );

  let video = '';
  if (data && path === 'meals') {
    video = data[path][0].strYoutube.replace('watch?v=', 'embed/');
  }
  if (data && path === 'drinks') {
    video = data[path][0].strVideo && (
      data[path][0].strVideo.replace('watch?v=', 'embed/'));
  }

  const handleClick = () => {
    history.push(`/${path}/${id}/in-progress`);
  };

  return (
    <div>
      {/* <button type="button" onClick={ mockStorage }>mock</button> */}
      {
        data
          ? (
            <div className="recipeDetailsContainer">
              <img
                src={
                  data[path][0][`str${source}Thumb`]
                }
                alt=""
                data-testid="recipe-photo"
                className="recipeDetailImg"

              />
              <button
                type="button"
                onClick={ (event) => handleClick(event) }
              >
                <img
                  name="share"
                  data-testid="share-btn"
                  src={ shareIcon }
                  alt="Share Icon"
                />
              </button>
              <button
                type="button"
                onClick={ (event) => handleClick(event) }
              >
                <img
                  name="favorite"
                  data-testid="favorite-btn"
                  src={ favoriteIcon }
                  alt="Favorite Icon"
                />
              </button>
              <p>
                <span data-testid="recipe-title">
                  {data[path][0][`str${source}`]}
                </span>
              </p>
              <p>
                <span data-testid="recipe-category">
                  {
                    path === 'drinks'
                      ? `${data[path][0].strCategory} ${data[path][0].strAlcoholic}`
                      : data[path][0].strCategory
                  }
                </span>
              </p>
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
              <span>{ }</span>
              <span data-testid="instructions">{data[path][0].strInstructions}</span>
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
              {recommendations
                && (
                  <div className="carouselContainer">
                    {recommendations[matcher2]
                      .map((a, index) => (
                        index < maxRecom && (<Recommendations
                          key={ `key-${index}` }
                          recipe={ a }
                          index={ index }
                        />)))}
                  </div>)}
              {
                !isDoneRecipe
                && (
                  <button
                    type="button"
                    data-testid="start-recipe-btn"
                    className="btnStartRecipe"
                    onClick={ handleClick }
                  >
                    {isinProgressRecipe
                      ? (
                        <span>
                          Continue Recipe
                        </span>)
                      : (
                        <span>
                          Start Recipe
                        </span>
                      )}
                  </button>
                )
              }
            </div>
          )
          : (
            <div />
          )
      }
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getData: (url) => dispatch(fetchApi(url)),
  getData2: (url) => dispatch(fetchApi2(url)),

});

const mapStateToProps = (state) => ({
  data: state.apiResponse.data,
  recommendations: state.apiResponse.recommendations,
});

RecipeDetails.propTypes = {
  getData: PropTypes.func,
  data: PropTypes.shape({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
