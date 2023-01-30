import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import reduxState from './mocks/requestMeal';

const searchTopBtn = 'search-top-btn';

describe('Testes do componente SearchBar na rota "/meals"', () => {
  beforeEach(() => {
    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => { });
    renderWithRouterAndRedux(<App />, reduxState, '/meals');
    const btnEnableSearch = screen.getByTestId(searchTopBtn);
    expect(btnEnableSearch).toBeVisible();
    userEvent.click(btnEnableSearch);
  });

  it('Deve ser possivel buscar por ingrediente', async () => {
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'lemon');
    const lblIngredient = screen.getByText(/ingredient/i);
    userEvent.click(lblIngredient);
    const btnSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(btnSearch);
    const card = await screen.findByTestId('0-recipe-card');
    expect(card).toBeInTheDocument();
  });

  it('Deve ser possivel buscar por name', async () => {
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'orange');
    const lblName = screen.getByText(/name/i);
    userEvent.click(lblName);
    const btnSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(btnSearch);
  });

  it('Deve ser possivel buscar por first letter', async () => {
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'F');
    const lblFirstLetter = screen.getByText(/first letter/i);
    userEvent.click(lblFirstLetter);
    const btnSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(btnSearch);
  });

  it('Deve disparar um alert caso seja buscado por first letter com mais de um caractere', async () => {
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'lemon');
    const lblFirstLetter = screen.getByText(/first letter/i);
    userEvent.click(lblFirstLetter);
    const btnSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(btnSearch);
  });

  it('Deve disparar um alert caso não encontre receitas', async () => {
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'xablau');
    const lblName = screen.getByText(/name/i);
    userEvent.click(lblName);
    const btnSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(btnSearch);
    await waitFor(() => expect(global.alert).toBeCalled());
  });
});

describe('Testes do componente SearchBar na rota "/drinks"', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />, {}, '/drinks');
    const btnEnableSearch = screen.getByTestId(searchTopBtn);
    expect(btnEnableSearch).toBeVisible();
    userEvent.click(btnEnableSearch);
  });
  it('Deve ser possivel buscar por ingrediente', async () => {
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'lemon');
    const lblIngredient = screen.getByText(/ingredient/i);
    userEvent.click(lblIngredient);
    const btnSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(btnSearch);
  });
  it('Deve ser possivel buscar por name', async () => {
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'orange');
    const lblName = screen.getByText(/name/i);
    userEvent.click(lblName);
    const btnSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(btnSearch);
  });
  it('Deve ser possivel buscar por first letter', async () => {
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'F');
    const lblFirstLetter = screen.getByText(/first letter/i);
    userEvent.click(lblFirstLetter);
    const btnSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(btnSearch);
  });
});

describe('Testes de rota iniciando em /meals', () => {
  it('Deve redirecionar caso encontre apenas 1 receita', async () => {
    const { history } = renderWithRouterAndRedux(<App />, reduxState, '/meals');
    const btnEnableSearch = screen.getByTestId(searchTopBtn);
    expect(btnEnableSearch).toBeVisible();
    userEvent.click(btnEnableSearch);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'Corba');
    const lblName = screen.getByText(/name/i);
    userEvent.click(lblName);
    const btnSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(btnSearch);
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52977'));
  });
});
