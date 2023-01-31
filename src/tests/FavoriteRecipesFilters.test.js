import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import reduxState from './mocks/requestDrink';

describe('Testes do componente FavoriteRecipesFilters', () => {
  it('Deve renderizar corretamente os filtros', async () => {
    renderWithRouterAndRedux(<App />, reduxState, '/favorite-recipes');
    const btn1 = screen.getByRole('button', { name: /all/i });
    const btn2 = screen.getByRole('button', { name: /food/i });
    const btn3 = screen.getByRole('button', { name: /drinks/i });
    expect(btn1).toBeVisible();
    expect(btn2).toBeVisible();
    expect(btn3).toBeVisible();
  });
  it('Ao ser clicado deve enviar para o componente pai qual botão foi clicado', async () => {
    renderWithRouterAndRedux(<App />, reduxState, '/favorite-recipes');
    const btn1 = screen.getByRole('button', { name: /all/i });
    const btn2 = screen.getByRole('button', { name: /food/i });
    const btn3 = screen.getByRole('button', { name: /drinks/i });
    userEvent.click(btn1);
    userEvent.click(btn2);
    userEvent.click(btn3);
  });
});
