import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import FavoriteRecipesFilters from '../components/FavoriteRecipesFilters';
import favoriteIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState(null);
  const [alerta, setAlerta] = useState(false);

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
      clipboardCopy(
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
  };

  const mockLocalStorage = () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(
        [{
          id: '52977',
          type: 'meal',
          nationality: '',
          category: 'Side',
          alcoholicOrNot: '',
          name: 'Corba',
          image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        },
        {
          id: '52771',
          type: 'meal',
          nationality: 'Italian',
          category: 'Vegetarian',
          alcoholicOrNot: '',
          name: 'Spicy Arrabiata Penne',
          image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        },
        {
          id: '178319',
          type: 'drink',
          nationality: '',
          category: 'Cocktail',
          alcoholicOrNot: 'Alcoholic',
          name: 'Aquamarine',
          image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        }],
      ),
    );
  };

  return (
    <div>
      <button type="button" onClick={ mockLocalStorage }>MakeTestTestable</button>
      <Header />
      <FavoriteRecipesFilters handleClick={ handleClick } />
      <div className="favoritesDisplay">
        {
          alerta && <p>Link copied!</p>
        }
        {
          favorites
          && (
            favorites.map((e, index) => (
              <div key={ `favorite-${index}` } className="favoriteDisplay">
                <img
                  src={ e.image }
                  alt={ `${e.name}` }
                  className="favoriteImg"
                  data-testid={ `${index}-horizontal-image` }
                />
                <div className="favoriteInfos">
                  <p data-testid={ `${index}-horizontal-name` }>{e.name}</p>

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
