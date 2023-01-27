import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa a página de login', () => {
  const EMAIL_INPUT = 'email-input';
  const PASSWORD_INPUT = 'password-input';
  const BUTTON_SUBMIT = 'login-submit-btn';

  test('Verifica se os inputs e o botão são renderizados', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginBtn = screen.getByTestId(BUTTON_SUBMIT);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });

  test('Verifica se a página redireciona como o esperado', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    userEvent.type(emailInput, 'teste@trybe.com');
    userEvent.type(passwordInput, '1234567');

    const loginBtn = screen.getByTestId(BUTTON_SUBMIT);

    userEvent.click(loginBtn);
    expect(history.location.pathname).toBe('/meals');
  });
});
