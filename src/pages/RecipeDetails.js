import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchApi } from '../redux/actions';

function RecipeDetails(props) {
  const { getData, data } = props;
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const { id } = useParams();
  const source = path.charAt(0).toUpperCase() + path.slice(1, path.length - 1);

  useEffect(() => {
    if (pathname.includes('/meals')) {
      getData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    }
    if (pathname.includes('/drinks')) {
      getData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    }
  }, []);

  const ingredients = data && Object.entries(data[path][0]).filter((ingredient) => (
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

  return (
    <div>
      {
        data
          ? (
            <div>
              <img
                src={
                  data[path][0][`str${source}Thumb`]
                }
                alt=""
                data-testid="recipe-photo"
                className="recipeDetailImg"

              />
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
              <span>{}</span>
              <span data-testid="instructions">{data[path][0].strInstructions}</span>
              <iframe
                width="560"
                height="315"
                src={ video }
                title="YouTube video player"
                allow={ `accelerometer;
autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share` }
                allowFullScreen
                data-testid="video"
              />
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
});

const mapStateToProps = (state) => ({
  data: state.apiResponse.data,
});

RecipeDetails.propTypes = {
  getData: PropTypes.func,
  data: PropTypes.shape({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
