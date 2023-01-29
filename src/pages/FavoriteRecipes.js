import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FavoriteRecipesFilters from '../components/FavoriteRecipesFilters';

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const handleClick = ({ target }) => {
    console.log(target);
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
                  <p data-testid={ `${index}-horizontal-top-text` }>{e.category}</p>
                  <button data-testid={ `${index}-horizontal-share-btn` }>Share</button>
                  <button data-testid={ `${index}-horizontal-favorite-btn` }>
                    Favorite
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
