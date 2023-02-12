/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchApi2 } from '../redux/actions';
import RecommendationCard from './RecommendationCard';

function Recommendations({ getData, recommendations }) {
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const matcher = path.charAt(0).toUpperCase() + path.slice(1, path.length - 1)
  === 'Meal' ? 'drinks' : 'meals';
  const maxRecom = 6;

  const [validData, setValidData] = useState(false);

  useEffect(() => {
    if (pathname.includes('/meals')) {
      getData('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
    if (pathname.includes('/drinks')) {
      getData('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
  }, [pathname]);

  useEffect(() => {
    if (recommendations && recommendations[matcher]) {
      setValidData(true);
    }
  }, [recommendations]);

  return (
    <div className="carouselContainer">
      {validData
      && (
        recommendations[matcher]
          .map((recom, index) => (
            index < maxRecom && (
              <RecommendationCard
                key={ `key-${index}` }
                recipe={ recom }
                index={ index }
              />)))
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getData: (url) => dispatch(fetchApi2(url)),

});

const mapStateToProps = (state) => ({
  recommendations: state.apiResponse.recommendations,
});

Recommendations.propTypes = {
  getData: PropTypes.func,
  recommendations: PropTypes.shape({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations);
