import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Footer test', () => {
  test('Testa se os botões são renderizados na rota /meals', () => {
    const { history: { location: { pathname } } } = renderWithRouterAndRedux(<Profile />, {}, '/profile');
    const buttons = screen.getAllByRole('img');
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[1]).toBeInTheDocument();
    userEvent.click(buttons[0]);
    waitFor(() => {
      expect(pathname).toBe('/meals');
    });
  });

  test('Testa se os botões são renderizados na rota /drink', () => {
    const { history: { location: { pathname } } } = renderWithRouterAndRedux(<Profile />, {}, '/profile');
    const buttons = screen.getAllByRole('img');
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[1]).toBeInTheDocument();
    userEvent.click(buttons[1]);
    waitFor(() => {
      expect(pathname).toBe('/drink');
    });
  });

  it('Testa se o botão de "Drinks" leva para a rota esperada', () => {
    const { history: { location: { pathname } } } = renderWithRouterAndRedux(<Profile />, {}, '/profile');
    const drink = screen.getByTestId('drink-btn');

    userEvent.click(drink);
    waitFor(() => {
      expect(pathname).toBe('/drink');
    });
  });

  it('Testa se o botão de "Meals" leva para a rota esperada', () => {
    const { history: { location: { pathname } } } = renderWithRouterAndRedux(<Profile />, {}, '/profile');
    const meals = screen.getByTestId('meals-btn');

    userEvent.click(meals);
    waitFor(() => {
      expect(pathname).toBe('/meals');
    });
  });
});
