import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import '../styles/RecipeCard.css';
import loading from '../images/loading.gif';

function RecommendationCard(props) {
  const { recipe, index } = props;
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const matcher = path.charAt(0).toUpperCase() + path.slice(1, path.length - 1)
  === 'Meal' ? 'Drink' : 'Meal';

  return (
    <Link
      to={
        pathname.includes('/meals')
          ? `/drinks/${recipe.idDrink}`
          : `/meals/${recipe.idMeal}`
      }
    >
      <div className="recipeCard" data-testid={ `${index}-recipe-card` }>
        <img
          src={ recipe[`str${matcher}Thumb`]
            ? recipe[`str${matcher}Thumb`]
            : loading }
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
      </div>
    </Link>
  );
}

RecommendationCard.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
}.isRequired;

export default RecommendationCard;
