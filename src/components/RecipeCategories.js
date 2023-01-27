/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchApi, filterCategory } from '../redux/actions';

function RecipeCategories(props) {
  const { getCategories, categories, setCategory } = props;
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const maxCategories = 5;

  useEffect(() => {
    if (path.includes('meals')) {
      getCategories('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    }
    if (path.includes('drinks')) {
      getCategories('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    }
  }, [path]);

  const handleClick = ({ target }) => {
    const { name } = target;
    if (name === 'All') {
      setCategory('');
    } else {
      setCategory(name);
    }
  };

  return (
    <div className="categoriesContainer">
      <button
        type="button"
        name="All"
        data-testid="All-category-filter"
        className="recipeCategory"
        onClick={ (e) => handleClick(e) }
      >
        All
      </button>
      {
        categories && categories[path]
          ? (
            categories[path].map((category, index) => (
              index < maxCategories && (
                <button
                  type="button"
                  name={ category.strCategory }
                  data-testid={ `${category.strCategory}-category-filter` }
                  key={ `category-${index}` }
                  className="recipeCategory"
                  onClick={ (e) => handleClick(e) }
                >
                  {category.strCategory}
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
  setCategory: (category) => dispatch(filterCategory(category)),
});

const mapStateToProps = (state) => ({
  categories: state.apiResponse.categories,
});

RecipeCategories.defaultProps = {
  categories: null,
};

RecipeCategories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
  categories: PropTypes.shape({}),
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCategories);
