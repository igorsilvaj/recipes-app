/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { fetchApi } from '../redux/actions';
import RecipeCategories from '../components/RecipeCategories';

function Recipes(props) {
  const { getData, data } = props;
  const history = useHistory();
  const firstMount = useRef(true);
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const maxRecipeCards = 12;

  useEffect(() => {
    // Caso seja a primeira montagem do componente
    // executa o que está dentro do if
    if (firstMount.current) {
      if (path.includes('meals')) {
        getData('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      }
      if (path.includes('drinks')) {
        getData('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      }
    } else {
      // seta para false após a primeira montagem
      firstMount.current = false;
    }
  }, []);

  return (
    <div>
      Recipes
      <button type="button" data-testid="search-top-btn">button</button>
      <SearchBar />
      {
        data && data[path]
          ? (
            <div>
              <RecipeCategories />
              <div className="cardsContainer">
                {data[path].map((e, index) => (
                  index < maxRecipeCards && (
                    <RecipeCard key={ `recipe-${index}` } recipe={ e } index={ index } />
                  )
                ))}
              </div>
            </div>
          )
          : (<div />)
      }
      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getData: (url) => dispatch(fetchApi(url)),
});

const mapStateToProps = (state) => ({
  data: state.apiResponse.data,
});

Recipes.defaultProps = {
  data: null,
};

Recipes.propTypes = {
  data: PropTypes.shape({}),
  getData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
