import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
// import Recipes from '../pages/Recipes';

describe('Testando componente <Header />', () => {
  const DATA_TEST_ID_EMAIL = 'profile-email';
  const DATA_TEST_ID_DONE = 'profile-done-btn';
  const DATA_TEST_ID_FAVORITE = 'profile-favorite-btn';

  const MOCK_LOCALSTORAGE_KEY = 'user';
  const MOCK_LOCALSTORAGE_EMAIL = 'teste@teste.com';

  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  setLocalStorage(MOCK_LOCALSTORAGE_KEY, MOCK_LOCALSTORAGE_EMAIL);

  it('Testa se os elementos corretos estão presentes na página', () => {
    renderWithRouterAndRedux(<Profile />);

    const userEmail = screen.getByTestId(DATA_TEST_ID_EMAIL);
    const doneRecipesBtn = screen.getByTestId(DATA_TEST_ID_DONE);
    const favoriteRecipesBtn = screen.getByTestId(DATA_TEST_ID_FAVORITE);

    expect(userEmail).toBeInTheDocument();
    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeInTheDocument();
  });

  it('Testa se o redirecionamento do botão "Done Recipes" funciona como esperado', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);

    const doneRecipesBtn = screen.getByTestId(DATA_TEST_ID_DONE);
    userEvent.click(doneRecipesBtn);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Testa se o redirecionamento do botão "Favorite Recipes" funciona como esperado', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);

    const favoriteRecipesBtn = screen.getByTestId(DATA_TEST_ID_FAVORITE);
    userEvent.click(favoriteRecipesBtn);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Testa se o redirecionamento do botão "Logout" funciona como esperado', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);

    const logout = screen.getByTestId('profile-logout-btn');
    userEvent.click(logout);

    expect(history.location.pathname).toBe('/');
  });
});
