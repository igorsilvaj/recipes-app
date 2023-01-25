import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { fetchApi } from '../redux/actions';
import store from '../redux/store';

export default function SearchBar() {
  const history = useHistory();
  const [search, setSearch] = useState({
    searchInput: '',
    searchRadio: '',
  });

  const handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setSearch({ ...search, [name]: value });
  };

  const handleClick = () => {
    const { searchInput, searchRadio } = search;
    console.log(searchInput, searchRadio);
    const url = history.location.pathname === '/meals'
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?${searchRadio}=${searchInput}`
      : `https://www.thecocktaildb.com/api/json/v1/1/search.php?${searchRadio}=${searchInput}`;
    // console.log(history.location.pathname);
    if (searchInput.length > 1 && searchRadio === 'f') {
      global.alert('Your search must have only 1 (one) character');
    }
    store.dispatch(fetchApi(url));
  };

  return (
    <div>
      <input
        type="text"
        name="searchInput"
        value={ search.searchInput }
        data-testid="search-input"
        onChange={ (e) => handleChange(e) }
      />
      <label htmlFor="ingredient-search-radio">
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
      <label htmlFor="name-search-radio">
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
      <label htmlFor="first-letter-search-radio">
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
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        SEARCH
      </button>
    </div>
  );
}
