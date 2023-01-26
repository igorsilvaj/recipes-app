import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '../styles/RecipeCard.css';

function RecipeCard(props) {
  const { recipe, index } = props;
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const matcher = path.charAt(0).toUpperCase() + path.slice(1, path.length - 1);

  const HandleCLick = () => {
    if (pathname.includes('/meals')) {
      history.push(`/meals/${recipe.idMeal}`);
      console.log(recipe);
    }
    if (pathname.includes('/drinks')) {
      history.push(`/drinks/${recipe.idDrink}`);
      console.log(recipe);
    }
  };
  return (
    <div className="recipeCard" data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipe[`str${matcher}Thumb`] }
        alt="recipe"
        data-testid={ `${index}-card-img` }
        className="imgCard"
      />
      <p className="txtCard">
        <span
          data-testid={ `${index}-card-name` }
        >
          {recipe[`str${matcher}`]}
        </span>
      </p>
      <button
        type="button"
        onClick={ HandleCLick }
      >

        Veja Detalhes

      </button>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
}.isRequired;

export default RecipeCard;

