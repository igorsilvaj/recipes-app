import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchApi } from '../redux/actions';

function RecipeDetails(props) {
  const { getData } = props;

  const { id } = useParams();

  const history = useHistory();
  useEffect(() => {
    const { pathname } = history.location;
    if (pathname.includes('/meals')) {
      getData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    }
    if (pathname.includes('/drinks')) {
      getData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    }
  }, []);

  return (
    <div>
      {/* <img src={} alt="" data-testid="recipe-photo"/> */}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getData: (url) => dispatch(fetchApi(url)),
});

const mapStateToProps = (state) => ({
  data: state.apiResponse.data,
});

RecipeDetails.propTypes = {
  getData: PropTypes.func,
  data: PropTypes.shape({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
