/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { fetchApi } from '../redux/actions';
import RecipeCategories from '../components/RecipeCategories';
import Header from '../components/Header';

function Recipes(props) {
  const { getData, data, selectedCategory } = props;
  const history = useHistory();
  const firstMount = useRef(true);
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const maxRecipeCards = 12;

  const [filteredRecipes, setFilteredRecipes] = useState(null);

  // Renderiza as receitas nesse endpoint sem filtro toda vez que o path "url" muda
  useEffect(() => {
    if (path.includes('meals')) {
      getData('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
    if (path.includes('drinks')) {
      getData('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }, [path]);

  // toda vez que as receitas que estão salvas em data forem alteradas
  // as receitas filtradas precisam ter uma atualização
  useEffect(() => {
    if (!firstMount.current) {
      setFilteredRecipes(data[path]);
    }
  }, [data]);

  // Renderiza as receitas quando usuario clica em algum filtro
  // não deve executar na primeira render do componente
  useEffect(() => {
    if (!firstMount.current) {
      if (path.includes('meals') && selectedCategory !== '') {
        getData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
      } else if (path.includes('meals')) {
        getData('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      }
      if (path.includes('drinks') && selectedCategory !== '') {
        getData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
      } else if (path.includes('drinks')) {
        getData('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      }
    }
    firstMount.current = false;
  }, [selectedCategory]);

  // const filteredRecipes = data && data[path]
  //   && data[path].filter((e) => e.strCategory.includes(selectedCategory));

  return (
    <>
      <Header />
      <br />
      <div>
        {
        filteredRecipes
          ? (
            <div>
              <RecipeCategories key={ `actual-${path}` } />
              <div className="cardsContainer">
                {filteredRecipes.map((e, index) => (
                  index < maxRecipeCards && (
                    <RecipeCard key={ `recipe-${index}` } recipe={ e } index={ index } />
                  )
                ))}
              </div>
            </div>
          )
          : (<div />)
      }
      </div>
      <Footer />
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getData: (url) => dispatch(fetchApi(url)),
});

const mapStateToProps = (state) => ({
  data: state.apiResponse.data,
  selectedCategory: state.userInteraction.filterCategory,
});

Recipes.defaultProps = {
  data: null,
  selectedCategory: '',
};

Recipes.propTypes = {
  data: PropTypes.shape({}),
  getData: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
