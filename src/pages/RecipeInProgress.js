/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../redux/actions';
import RecipeInProgressHelper from '../components/RecipeInProgressHelper';

function RecipeInProgress({ getData, data }) {
  const firstMount = useRef(true);
  const [alerta, setAlerta] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [ingredientChk, setIngredientChk] = useState({ 'ingredient-0': true });
  const [ingredients, setIngredients] = useState();
  const [measure, setMeasure] = useState();
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const id = pathname.split('/')[2];
  const source = path.charAt(0).toUpperCase() + path.slice(1, path.length - 1);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favorite, setFavorite] = useState(favoriteRecipes
    && !!favoriteRecipes.find((e) => e.id === id));

  useEffect(() => {
    if (firstMount.current) {
      if (pathname.includes('/meals')) {
        getData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      }
      if (pathname.includes('/drinks')) {
        getData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      }
    }
    firstMount.current = false;
  }, []);

  useEffect(() => {
    const ingredientsList = data && data !== undefined
      && Object.entries(data[path][0]).filter((ingredient) => (
        ingredient[0].includes('strIngredient'))).map((e) => e[1]).filter(
        (e) => (e !== '' && e !== null),
      );

    const measureList = data && Object.entries(data[path][0]).filter((ingredient) => (
      ingredient[0].includes('strMeasure'))).map((e) => e[1]).filter(
      (e) => (e !== '' && e !== null),
    );
    setIngredients(ingredientsList);
    setMeasure(measureList);
    const doneIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setIngredientChk(doneIngredients[path][id].reduce((acc, act) => (
      { ...acc, [act]: true }), {}));
  }, [data]);

  const handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setIngredientChk({ ...ingredientChk, [name]: value });
    let local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const result = [];
    if (local[path][id].find((e) => e === name)) {
      result.push(...local[path][id].filter((e) => e !== name));
    } else {
      result.push(...local[path][id]);
      result.push(name);
    }
    local = {
      ...local,
      [path]: local[path] && Object.assign(
        local[path],
        { [id]: [...result] },
      ),
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(local));
    if (ingredients) {
      console.log('change');
      const h5Elements = [].slice.call(document.getElementsByTagName('h5'));
      const checks = h5Elements.map((each) => each.previousElementSibling.checked)
        .find((each) => each === false);
      if (checks === undefined) {
        setIsButtonDisabled(false);
      } else { setIsButtonDisabled(true); }
    }
  };

  function handleBtnClick() {
    history.push('/done-recipes');
    const done = {
      id,
      type: source.toLowerCase(),
      nationality: path === 'meals' ? data[path][0].strArea : '',
      category: data[path][0].strCategory,
      alcoholicOrNot: path === 'drinks' ? data[path][0].strAlcoholic : '',
      name: data[path][0][`str${source}`],
      image: data[path][0][`str${source}Thumb`],
      doneDate: new Date(),
      tags: data[path][0].strTags !== null ? data[path][0].strTags.split(',') : [],
    };
    localStorage.setItem('doneRecipes', JSON.stringify([done]));
  }

  const handleClick = ({ target }) => {
    const { name } = target;
    const goodTime = 3000;
    if (name.includes('startRecipe')) {
      history.push(`/${path}/${id}/in-progress`);
    }
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
            <RecipeInProgressHelper
              { ...{
                data,
                path,
                source,
                favorite,
                ingredients,
                ingredientChk,
                handleChange,
                measure,
                isButtonDisabled,
                handleBtnClick,
                handleClick,
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
});

const mapStateToProps = (state) => ({
  data: state.apiResponse.data,
});

RecipeInProgress.propTypes = {
  getData: PropTypes.func,
  data: PropTypes.shape({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInProgress);
