/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchApi } from '../redux/actions';

function SearchBar(props) {
  const { getData, data, selectedCategory } = props;
  const history = useHistory();
  const [search, setSearch] = useState({
    searchInput: '',
    searchRadio: '',
  });

  // Sempre que data for atualizado verifica se tem somente 1 receita
  // caso tenha só 1 redireciona para /"pagina atual meals ou drinks"/"id"
  useEffect(() => {
    const { pathname } = history.location;
    const path = pathname.split('/')[1];
    if (data) {
      if (!data[path]) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (data[path].length === 1 && selectedCategory === '') {
        return history.push(
          `${pathname}/${data[path][0][
            `id${path.charAt(0).toUpperCase() + path.slice(1, path.length - 1)}`
          ]}`,
        );
      }
    }
  }, [data]);

  // função padrão para controlar os componentes no estado local
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setSearch({ ...search, [name]: value });
  };

  // Ao clicar em SEARCH faz um fetch com o endpoint dependendo da pagina atual
  const handleClick = () => {
    const { searchInput, searchRadio } = search;
    let url = '';
    if (history.location.pathname === '/meals' && searchRadio === 'i') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?${searchRadio}=${searchInput}`;
    } else if (history.location.pathname === '/meals') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?${searchRadio}=${searchInput}`;
    }
    if (history.location.pathname === '/drinks' && searchRadio === 'i') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${searchRadio}=${searchInput}`;
    } else if (history.location.pathname === '/drinks') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${searchRadio}=${searchInput}`;
    }
    if (searchInput.length > 1 && searchRadio === 'f') {
      global.alert('Your search must have only 1 (one) character');
    }
    getData(url);
  };

  return (
    <div className="searchBarContainer">
      <input
        type="text"
        name="searchInput"
        className="searchInput"
        value={ search.searchInput }
        placeholder="Search"
        data-testid="search-input"
        onChange={ (e) => handleChange(e) }
      />
      <div className="searchRadioContainer">
        <label htmlFor="ingredient-search-radio" className="searchLbl">
          <input
            type="radio"
            name="searchRadio"
            value="i"
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
            onChange={ (e) => handleChange(e) }
          />
          Ingredient
        </label>
        <label htmlFor="name-search-radio" className="searchLbl">
          <input
            type="radio"
            name="searchRadio"
            value="s"
            id="name-search-radio"
            data-testid="name-search-radio"
            onChange={ (e) => handleChange(e) }
          />
          Name
        </label>
        <label htmlFor="first-letter-search-radio" className="searchLbl">
          <input
            type="radio"
            name="searchRadio"
            value="f"
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
            onChange={ (e) => handleChange(e) }
          />
          First Letter
        </label>
      </div>
      <button
        type="button"
        className="searchBtn"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        SEARCH
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.apiResponse.data,
  selectedCategory: state.userInteraction.filterCategory,
});

const mapDispatchToProps = (dispatch) => ({
  getData: (url) => dispatch(fetchApi(url)),
});

SearchBar.defaultProps = {
  data: null,
  selectedCategory: '',
};

SearchBar.propTypes = {
  getData: PropTypes.func.isRequired,
  data: PropTypes.shape({}),
  selectedCategory: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
