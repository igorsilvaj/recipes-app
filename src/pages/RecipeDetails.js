import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchApi } from '../redux/actions';

function RecipeDetails(props) {
  const { getData, data, match } = props;
  const { params: { id } } = match;
  const history = useHistory();

  useEffect(() => {
    const { pathname } = history.location;
    if (pathname.includes('/meals')) {
      getData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    }
    if (pathname.includes('/drinks')) {
      getData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      console.log(data);
    }
  }, []);

  return (
    <div>RecipeDetails</div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  getData: (url) => dispatch(fetchApi(url)),
});
const mapStateToProps = (state) => ({
  data: state.apiResponse.data,
});

RecipeDetails.propTypes = {
  getData: PropTypes.func.isRequired,
  data: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({ params, id }).isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
