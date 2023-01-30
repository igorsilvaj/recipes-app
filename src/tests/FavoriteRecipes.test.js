import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import reduxState from './mocks/requestDrink';

const localStorageToSet = [{
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
}];

describe('Testes do componente FavoriteRecipesFilters', () => {
  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  setLocalStorage('favoriteRecipes', localStorageToSet);

  it('Deve renderizar corretamente os cards', async () => {
    renderWithRouterAndRedux(<App />, reduxState, '/favorite-recipes');
    const img1 = screen.getByRole('img', { name: /corba/i });
    const img2 = screen.getByRole('img', { name: /spicy arrabiata penne/i });
    const img3 = screen.getByRole('img', { name: /aquamarine/i });
    expect(img1).toBeVisible();
    expect(img2).toBeVisible();
    expect(img3).toBeVisible();
  });
});
