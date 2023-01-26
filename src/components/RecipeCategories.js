/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchApi } from '../redux/actions';

function RecipeCategories(props) {
  const { getCategories, categories } = props;
  const history = useHistory();
  const firstMount = useRef(true);
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const maxCategories = 5;

  useEffect(() => {
    // Caso seja a primeira montagem do componente
    // executa o que está dentro do if
    if (firstMount.current) {
      if (path.includes('meals')) {
        getCategories('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      }
      if (path.includes('drinks')) {
        getCategories('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      }
    } else {
      // seta para false após a primeira montagem
      firstMount.current = false;
    }
  }, []);

  return (
    <div className="categoriesContainer">
      {
        categories && categories[path]
          ? (
            categories[path].map((e, index) => (
              index < maxCategories && (
                <button
                  type="button"
                  data-testid={ `${e.strCategory}-category-filter` }
                  key={ `category-${index}` }
                  className="recipeCategory"
                >
                  {e.strCategory}
                </button>
              )
            ))
          )
          : (<div />)
      }
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getCategories: (url) => dispatch(fetchApi(url)),
});

const mapStateToProps = (state) => ({
  categories: state.apiResponse.categories,
});

RecipeCategories.defaultProps = {
  categories: null,
};

RecipeCategories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.shape({}),
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCategories);
