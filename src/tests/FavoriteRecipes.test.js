import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testes do componente FavoriteRecipesFilters', () => {
  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  setLocalStorage('favoriteRecipes', localStorageToSet);

  beforeEach(() => {
    renderWithRouterAndRedux(<App />, reduxState, '/favorite-recipes');
  });

  it('Deve renderizar corretamente os filtros', async () => {
    const btn1 = screen.getByRole('button', { name: /all/i });
    const btn2 = screen.getByRole('button', { name: /food/i });
    const btn3 = screen.getByRole('button', { name: /drinks/i });
    expect(btn1).toBeVisible();
    expect(btn2).toBeVisible();
    expect(btn3).toBeVisible();
  });

  it('Deve renderizar corretamente os cards', async () => {
    const img1 = screen.getByRole('img', { name: /corba/i });
    const img2 = screen.getByRole('img', { name: /spicy arrabiata penne/i });
    const img3 = screen.getByRole('img', { name: /aquamarine/i });
    expect(img1).toBeVisible();
    expect(img2).toBeVisible();
    expect(img3).toBeVisible();
  });

  it('Deve renderizar corretamente os cards ao filtrar por Food', async () => {
    const foodFilter = screen.getByRole('button', { name: /food/i });
    const img3 = screen.getByRole('img', { name: /aquamarine/i });
    userEvent.click(foodFilter);
    expect(img3).not.toBeInTheDocument();
  });

  it('Deve renderizar corretamente os cards ao filtrar por Drinks', async () => {
    const drinksFilter = screen.getByRole('button', { name: /Drinks/i });
    const allFilter = screen.getByRole('button', { name: /All/i });
    userEvent.click(drinksFilter);
    const objPos0 = await screen.findByTestId('0-horizontal-name');
    expect(objPos0.innerHTML).toBe('Aquamarine');
    userEvent.click(allFilter);
    expect(objPos0.innerHTML).toBe('Corba');
  });

  it('Deve gerar uma url ao clicar em compartilhar', async () => {
    jest.spyOn(navigator.clipboard, 'writeText');
    const btnShare = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(btnShare);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/meals/52977');
  });

  it('Deve remover da lista e do localStorage ao clicar no botão de favorite', async () => {
    const btnFavorite = await screen.findByTestId('0-horizontal-favorite-btn');
    const firstName = await screen.findByTestId('0-horizontal-name');
    userEvent.click(btnFavorite);
    expect(firstName.innerHTML).toBe('Spicy Arrabiata Penne');
  });
});
