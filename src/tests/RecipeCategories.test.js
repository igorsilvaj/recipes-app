import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import reduxState from './mocks/requestDrink';

describe('Testes do componente RecipeCategories', () => {
  it('Deve renderizar as categorias', async () => {
    renderWithRouterAndRedux(<App />, reduxState, '/drinks');
    const category = await screen.findByRole('button', { name: /cocoa/i });
    expect(category).toBeInTheDocument();
  });
  it('Deve filtrar ao clicar na categoria', async () => {
    renderWithRouterAndRedux(<App />, reduxState, '/drinks');
    const category = await screen.findByRole('button', { name: /cocoa/i });
    expect(category).toBeInTheDocument();
    userEvent.click(category);
    const card = await screen.findByText(/castillian hot chocolate/i);
    await waitFor(() => expect(card).toBeInTheDocument());
  });
  it('Deve remover o filtro ao clicar novamente na mesma categoria', async () => {
    renderWithRouterAndRedux(<App />, reduxState, '/drinks');
    const category = await screen.findByRole('button', { name: /cocoa/i });
    expect(category).toBeInTheDocument();
    userEvent.click(category);
    const card1 = await screen.findByText(/castillian hot chocolate/i);
    await waitFor(() => expect(card1).toBeInTheDocument());
    userEvent.click(category);
    const card2 = await screen.findByText(/gg/i);
    await waitFor(() => expect(card2).toBeInTheDocument());
  });
  it('Deve remover todos os filtros ao clicar no botão All', async () => {
    renderWithRouterAndRedux(<App />, reduxState, '/drinks');
    const category = await screen.findByRole('button', { name: /cocoa/i });
    expect(category).toBeInTheDocument();
    userEvent.click(category);
    const clearFilter = screen.getByRole('button', { name: /all/i });
    userEvent.click(clearFilter);
    const card1 = await screen.findByText(/gg/i);
    await waitFor(() => expect(card1).toBeVisible());
  });
  it('Não deve renderizar as categorias caso a api não responda', async () => {
    renderWithRouterAndRedux(<App />, { apiResponse: { categories: null } }, '/drinks');
    const clearFilter = await screen.findByRole('button', { name: /all/i });
    expect(clearFilter).toBeInTheDocument();
  });
});
