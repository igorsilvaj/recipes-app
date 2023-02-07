/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchApi, fetchApi2 } from '../redux/actions';
import RecipeDetailsHelper from '../components/RecipeDetailsHelper';

function RecipeDetails({ getData, data, getData2, recommendations }) {
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const source = path.charAt(0).toUpperCase() + path.slice(1, path.length - 1);

  const { id } = useParams();

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const isDoneRecipe = doneRecipes && !!(doneRecipes.find((e) => e.id === id));

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const inProgressRecipes1 = !!inProgressRecipes;

  const isinProgressRecipe = inProgressRecipes1 && (
    !!inProgressRecipes[path] && !!inProgressRecipes[path][id]);

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favorite, setFavorite] = useState(favoriteRecipes
    && !!favoriteRecipes.find((e) => e.id === id));

  const [alerta, setAlerta] = useState(false);

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

  const startRecipe = ({ target }) => {
    if (target.innerHTML === 'Start Recipe') {
      let local = inProgressRecipes;
      if (inProgressRecipes) {
        local = {
          ...local,
          [path]: local[path]
            ? Object.assign(local[path], { [id]: [] })
            : { [id]: [] },
        };
      } else {
        local = {
          ...local,
          [path]: { [id]: [] },
        };
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(local));
    }
    history.push(`/${path}/${id}/in-progress`);
  };

  const handleClick = ({ target }) => {
    const { name } = target;
    const goodTime = 3000;
    if (name.includes('share')) {
      navigator.clipboard.writeText(
        `${window.location.origin}/${path}/${id}`,
      );
      setAlerta(true);
      setTimeout(() => {
        setAlerta(false);
      }, goodTime);
    }
    if (name.includes('favorite')) {
      const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const favoriteRecipe = {
        alcoholicOrNot: path === 'drinks' ? data[path][0].strAlcoholic : '',
        category: data[path][0].strCategory,
        id,
        image: data[path][0][`str${source}Thumb`],
        name: data[path][0][`str${source}`],
        nationality: path === 'meals' ? data[path][0].strArea : '',
        type: source.toLowerCase(),
      };
      if (local) {
        if (local.find((e) => e.id === id)) {
          const filtered = local.filter((e) => e.id !== id);
          localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
          setFavorite(false);
        } else {
          local.push(favoriteRecipe);
          localStorage.setItem('favoriteRecipes', JSON.stringify(local));
          setFavorite(true);
        }
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipe]));
        setFavorite(true);
      }
    }
  };

  return (
    <div>
      {alerta && <p>Link copied!</p>}
      {
        data
          ? (
            <RecipeDetailsHelper
              { ...{
                data,
                path,
                source,
                favorite,
                ingredients,
                measure,
                video,
                recommendations,
                isDoneRecipe,
                handleClick,
                isinProgressRecipe,
                startRecipe,
              } }
            />
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
