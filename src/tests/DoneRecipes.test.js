import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import doneRecipesMock from './mocks/dataDoneRecipes';
import DoneRecipes from '../pages/DoneRecipes';

const doneRecipesUrl = '/done-recipes';

describe('Testa página DoneRecipes', () => {
  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  setLocalStorage('doneRecipes', doneRecipesMock);
  test('Verifica se os elementos da pagina são renderizados', () => {
    renderWithRouterAndRedux(<DoneRecipes />, {}, doneRecipesUrl);
    const doneRecipesTitle = screen.getByText(/done recipes/i);
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    const mealsBtn = screen.getByRole('button', {
      name: /meals/i,
    });
    const drinksBtn = screen.getByRole('button', {
      name: /drinks/i,
    });
    const imgRecipe = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    const nameRecipe = screen.getByText(/spicy arrabiata penne/i);
    const description = screen.getByTestId('0-horizontal-top-text');
    const doneDate = screen.getByTestId('0-horizontal-done-date');
    const tag1 = screen.getByText(/pasta/i);
    const tag2 = screen.getByText(/curry/i);
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(doneRecipesTitle).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
    expect(imgRecipe).toBeInTheDocument();
    expect(nameRecipe).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(doneDate).toBeInTheDocument();
    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
  });

  test('Testa o redirecionamento ao clicar na imagem da receita', () => {
    const { history: {
      location: { pathname } } } = renderWithRouterAndRedux(<App />, {}, doneRecipesUrl);
    const imgRecipe = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    userEvent.click(imgRecipe);
    waitFor(() => {
      expect(pathname).toBe('/meals/52771');
    });
  });

  test('Testa o redirecionamento ao clicar nao nome da receita', () => {
    const { history: {
      location: { pathname } } } = renderWithRouterAndRedux(<App />, {}, doneRecipesUrl);
    const nameRecipe = screen.getByText(/spicy arrabiata penne/i);
    userEvent.click(nameRecipe);
    waitFor(() => {
      expect(pathname).toBe('/meals/52771');
    });
  });

  test('Testa o filtro meals e all', () => {
    renderWithRouterAndRedux(<DoneRecipes />, {}, doneRecipesUrl);
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    const mealsBtn = screen.getByRole('button', {
      name: /meals/i,
    });
    const imgDrink = screen.getByRole('img', {
      name: /aquamarine/i,
    });
    userEvent.click(mealsBtn);
    expect(imgDrink).not.toBeInTheDocument();
    userEvent.click(allBtn);
    waitFor(() => {
      expect(imgDrink).toBeInTheDocument();
    });
  });

  test('Testa o filtro drinks e all', () => {
    renderWithRouterAndRedux(<DoneRecipes />, {}, doneRecipesUrl);
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    const drinksBtn = screen.getByRole('button', {
      name: /drinks/i,
    });
    const imgMeal = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    userEvent.click(drinksBtn);
    expect(imgMeal).not.toBeInTheDocument();
    userEvent.click(allBtn);
    waitFor(() => {
      expect(imgMeal).toBeInTheDocument();
    });
  });

  it('Verifica se é gerada uma url ao clicar em compartilhar', async () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    renderWithRouterAndRedux(<App />, {}, doneRecipesUrl);
    const btnShare = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(btnShare);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/meals/52771');
  });
});
