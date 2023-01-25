import React from 'react';
import SearchBar from '../components/SearchBar';

export default function Recipes() {
  return (
    <div>
      Recipes
      <button type="button" data-testid="search-top-btn">button</button>
      <SearchBar />
    </div>
  );
}
