import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FavoriteRecipesFilters from '../components/FavoriteRecipesFilters';
import favoriteIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState(null);
  const [alerta, setAlerta] = useState(false);
  const [filter, setFilter] = useState('');

  const filteredFavorites = favorites !== null
    && favorites.filter((e) => e.type.includes(filter));

  useEffect(() => {
    const getLocalStorage = localStorage.getItem('favoriteRecipes');
    if (getLocalStorage && getLocalStorage.length > 0) {
      setFavorites(JSON.parse(getLocalStorage));
    }
  }, []);

  const handleClick = ({ target }) => {
    const { name } = target;
    const favoriteTarget = favorites[name.split('-')[0]];
    const goodTime = 3000;
    if (name.includes('share')) {
      console.log(window.location);
      navigator.clipboard.writeText(
        `${window.location.origin}/${favoriteTarget.type}s/${favoriteTarget.id}`,
      );
      setAlerta(true);
      setTimeout(() => {
        setAlerta(false);
      }, goodTime);
    }
    if (name.includes('favorite')) {
      setFavorites(favorites.filter((e) => e.id !== favoriteTarget.id));
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(favorites.filter((e) => e.id !== favoriteTarget.id)),
      );
    }
    if (name.includes('all')) {
      setFilter('');
    }
    if (name.includes('food')) {
      setFilter('meal');
    }
    if (name.includes('drinks')) {
      setFilter('drink');
    }
  };

  return (
    <div>
      <Header />
      <FavoriteRecipesFilters handleClick={ handleClick } />
      <div className="favoritesDisplay">
        {
          alerta && <p>Link copied!</p>
        }
        {
          favorites
          && (
            filteredFavorites.map((e, index) => (
              <div key={ `favorite-${index}` } className="favoriteDisplay">
                <Link to={ `/${e.type}s/${e.id}` }>
                  <img
                    src={ e.image }
                    alt={ `${e.name}` }
                    className="favoriteImg"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <div className="favoriteInfos">
                  <Link to={ `/${e.type}s/${e.id}` }>
                    <p data-testid={ `${index}-horizontal-name` }>{e.name}</p>
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { e.nationality || e.alcoholicOrNot
                      ? `${e.nationality}${e.alcoholicOrNot} - ${e.category}`
                      : e.category}
                  </p>
                  <button
                    type="button"
                    onClick={ (event) => handleClick(event) }
                  >
                    <img
                      name={ `${index}-share` }
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="Share Icon"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={ (event) => handleClick(event) }
                  >
                    <img
                      name={ `${index}-favorite` }
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ favoriteIcon }
                      alt="Favorite Icon"
                    />
                  </button>
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
}
