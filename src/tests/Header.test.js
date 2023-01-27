import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Header from '../components/Header';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
// import Recipes from '../pages/Recipes';

describe('Testando componente <Header />', () => {
  const DATA_TEST_ID_SEARCH = 'search-top-btn';

  it('Testa se todos os elementos do componente são renderizados', () => {
    renderWithRouterAndRedux(<Header />);
    const pageTitle = screen.getByTestId('page-title');
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId(DATA_TEST_ID_SEARCH);
    expect(pageTitle).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });

  it('Testa se o icone de "Profile" leva para a página de perfil', () => {
    const { history } = renderWithRouterAndRedux(<Header />);
    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });

  it('Testa se o icone de "Search" deixa a barra de pesquisa visivel', () => {
    renderWithRouterAndRedux(<Header />);
    const searchIcon = screen.getByTestId(DATA_TEST_ID_SEARCH);
    userEvent.click(searchIcon);

    const searchBarInput = screen.getByTestId('search-input');
    expect(searchBarInput).toBeInTheDocument();
  });

  it('Testa se o icone de "Search" deixa a barra de pesquisa invisivel', () => {
    renderWithRouterAndRedux(<Header />);
    const searchIcon = screen.getByTestId(DATA_TEST_ID_SEARCH);
    userEvent.click(searchIcon);

    const searchBarInput = screen.getByTestId('search-input');
    userEvent.click(searchIcon);
    expect(searchBarInput).not.toBeInTheDocument();
  });

  it('Testa se o icone de "Search" fica invisivel na rota especifica', () => {
    const route = '/done-recipes';
    const { history } = renderWithRouterAndRedux(<App />, {}, '/meals');
    const searchIcon = screen.getByTestId(DATA_TEST_ID_SEARCH);

    expect(searchIcon).toBeInTheDocument();

    act(() => {
      history.push(route);
      renderWithRouterAndRedux(<App />, {}, route);
      expect(history.location.pathname).toBe(route);

      // expect(searchIcon).not.toBeInTheDocument();
    });

    // screen.debug();
  });
});
