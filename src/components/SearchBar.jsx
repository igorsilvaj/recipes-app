import React, { useState } from 'react';
import store from '../redux/store';

export default function SearchBar() {
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
    store.dispatch();
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
          value="ingredient"
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
          value="name"
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
          value="firstLetter"
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
