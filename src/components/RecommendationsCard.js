import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '../styles/RecipeCard.css';
import { connect } from 'react-redux';
import { fetchApi, fetchApi2 } from '../redux/actions';

function Recommendations(props) {
  const { recipe, index } = props;
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const matcher = path.charAt(0).toUpperCase() + path.slice(1, path.length - 1)
   === 'Meal' ? 'Drink' : 'Meal';

  const HandleCLick = () => {
    if (pathname.includes('/meals')) {
      history.push(`/drinks/${recipe.idDrink}`);
    }
    if (pathname.includes('/drinks')) {
      history.push(`/meals/${recipe.idMeal}`);
    }
  };
  return (
    <button
      type="button"
      onClick={ HandleCLick }
      className="btnGoToDetails"
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
    </button>
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

Recommendations.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations);
