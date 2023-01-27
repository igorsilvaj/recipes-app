import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Footer test', () => {
  test('Verifica se os botões são renderizados e rota /meals', () => {
    const { history: { location: { pathname } } } = renderWithRouterAndRedux(<Profile />, {}, '/profile');
    const buttons = screen.getAllByRole('img');
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[1]).toBeInTheDocument();
    userEvent.click(buttons[0]);
    waitFor(() => {
      expect(pathname).toBe('/meals');
    });
  });

  test('Verifica se os botões são renderizados e rota /drink', () => {
    const { history: { location: { pathname } } } = renderWithRouterAndRedux(<Profile />, {}, '/profile');
    const buttons = screen.getAllByRole('img');
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[1]).toBeInTheDocument();
    userEvent.click(buttons[1]);
    waitFor(() => {
      expect(pathname).toBe('/drink');
    });
  });
});
