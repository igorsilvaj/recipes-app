import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import '../styles/RecipeCard.css';
import { connect } from 'react-redux';
import { fetchApi, fetchApi2 } from '../redux/actions';

function RecommendationsCard(props) {
  const { recipe, index } = props;
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const matcher = path.charAt(0).toUpperCase() + path.slice(1, path.length - 1)
   === 'Meal' ? 'Drink' : 'Meal';

  return (
    <Link
      to={
        pathname.includes('/drinks')
          ? `/meals/${recipe.idMeal}`
          : `/drinks/${recipe.idDrink}`
      }
    >
      <div className="recipeCard" data-testid={ `${index}-recommendation-card` }>
        <img
          src={ recipe[`str${matcher}Thumb`] }
          alt="recipe"
          data-testid={ `${index}-card-img` }
          className="imgCard"
        />

        <p className="txtCard">
          <span
            data-testid={ `${index}-recommendation-title` }
          >
            {recipe[`str${matcher}`]}
          </span>
        </p>
      </div>
    </Link>
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

RecommendationsCard.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationsCard);
