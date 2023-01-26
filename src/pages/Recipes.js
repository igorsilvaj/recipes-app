import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';

function Recipes(props) {
  const history = useHistory();
  const { data } = props;
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const maxRecipeCards = 12;

  return (
    <div>
      <Footer />
      Recipes
      <button type="button" data-testid="search-top-btn">button</button>
      <SearchBar />
      {
        data && data[path]
          ? (
            data[path].map((e, index) => (
              index < maxRecipeCards && (
                <RecipeCard key={ `recipe-${index}` } recipe={ e } index={ index } />
              )
            ))
          )
          : (<div />)
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.apiResponse.data,
});

Recipes.defaultProps = {
  data: null,
};

Recipes.propTypes = {
  data: PropTypes.shape({}),
};

export default connect(mapStateToProps)(Recipes);
