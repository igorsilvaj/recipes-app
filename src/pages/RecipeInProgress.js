import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../redux/actions';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import favoritedIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress({ getData, data }) {
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const source = path.charAt(0).toUpperCase() + path.slice(1, path.length - 1);
  const matcher = path.charAt(0).toUpperCase() + path.slice(1, path.length - 1);
  const matcher2 = `${matcher.toLocaleLowerCase()}s`;
  const { id } = useParams();
  const firstMount = useRef(true);

  const [inProgress, setInProgress] = useState([]);
  const [inProgressLocal,
    setInProgressLocal] = useState({ drinks: { [id]: [] }, meals: { [id]: [] } });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (!firstMount.current) {
      localStorage.setItem(id, JSON.stringify(inProgressLocal));
    }
    firstMount.current = false;
  }, [id, inProgressLocal]);

  const ingredients = data && data !== undefined
  && Object.entries(data[path][0]).filter((ingredient) => (
    ingredient[0].includes('strIngredient'))).map((e) => e[1]).filter(
    (e) => (e !== '' && e !== null),
  );

  useEffect(() => {
    inProgress.forEach((el) => {
      el.previousElementSibling.checked = true;
      el.classList.add('step-check');
    });
    if (ingredients) {
      const h5Elements = [].slice.call(document.getElementsByTagName('h5'));
      const checks = h5Elements.map((each) => each.previousElementSibling.checked)
        .find((each) => each === false);
      if (checks === undefined) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }
  }, [inProgress, ingredients]);

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

  function handleChange({ target }) {
    const element = target.nextSibling;
    const elementLocal = target.nextSibling.innerHTML;
    setInProgressLocal((prevState) => ({ ...prevState,
      [matcher2]: { ...prevState[matcher2],
        [id]: [...prevState[matcher2][id], elementLocal] } }));
    setInProgress((prevState) => ([...prevState, element]));
  }

  useEffect(() => {
    if (pathname.includes('/meals')) {
      getData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    } if (pathname.includes('/drinks')) {
      getData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    }
  }, [getData, id, matcher2, pathname]);

  useEffect(() => {
    if (localStorage.getItem([id]) !== null && ingredients) {
      const steps = JSON.parse(localStorage.getItem([id]))[matcher2][id];
      const h5Elements = [].slice.call(document.getElementsByTagName('h5'));
      const progressSteps = steps.map((step) => (
        h5Elements.find((element) => step === element.innerHTML)
      ));

      progressSteps.forEach((el) => {
        el.previousElementSibling.checked = true;
        el.classList.add('step-check');
      });
    }
  }, [data, id, ingredients, matcher2]);

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favorite, setFavorite] = useState(favoriteRecipes
  && !!favoriteRecipes.find((e) => e.id === id));

  const [alerta, setAlerta] = useState(false);

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
  const measure = data && Object.entries(data[path][0]).filter((ingredient) => (
    ingredient[0].includes('strMeasure'))).map((e) => e[1]).filter(
    (e) => (e !== '' && e !== null),
  );
  return (
    <div>
      {alerta && <p>Link copied!</p>}
      { data && (
        <div>
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
              src={ favorite ? favoritedIcon : favoriteIcon }
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
          <span data-testid="instructions">{data[path][0].strInstructions}</span>
          {
            ingredients.map((e, index) => (
              <div key={ `ingredient-${index}` }>
                <label
                  className="step-check"
                  data-testid={ `${index}-ingredient-step` }
                  htmlFor={ `ingredient-${index}` }
                >
                  <input
                    id={ `ingredient-${index}` }
                    type="checkbox"
                    onChange={ handleChange }
                  />
                  <h5>{`${measure[index]} ${e}`}</h5>
                </label>
              </div>
            ))
          }
          <button
            disabled={ isButtonDisabled }
            onClick={ handleBtnClick }
            type="button"
            data-testid="finish-recipe-btn"
          >
            finish recipe
          </button>
        </div>
      ) }
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
